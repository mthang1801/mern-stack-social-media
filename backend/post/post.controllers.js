const getAuthUser = require('../utils/getAuthUser');
const { User } = require('../user/user.model');
const { Post } = require('../post/post.model');
const { Notification } = require('../notification/notification.model');
const mongoose = require('mongoose');
const { POST_STATUS_ENUM } = require('./post.model');
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require('apollo-server-express');
const { fields, contents } = require('../notification');
const decodeBase64 = require('../utils/decodeBase64');
const { raiseError } = require('../utils/raiseError');
const constant = require('../config/constant');
exports.postControllers = {
  fetchPosts: async (
    req,
    userId = null,
    skip = 0,
    limit = constant.POSTS_PER_PAGE
  ) => {
    const currentUserId = getAuthUser(req, false);
    const currentUser = await User.findById(currentUserId);
    let posts;
    if (userId) {
      if (userId !== currentUserId) {
        posts = await Post.find({
          author: userId,
          $or: [
            { status: POST_STATUS_ENUM.FRIENDS, friends: currentUserId },
            { status: POST_STATUS_ENUM.PUBLIC },
          ],
        })
          .populate({
            path: 'mentions',
            select: 'name avatar slug isOnline offlinedAt',
          })
          .populate({
            path: 'author',
            select: 'name avatar slug isOnline offlinedAt',
          })
          .sort({ createdAt: -1 })
          .skip(+skip)
          .limit(+limit);
      } else {
        posts = await Post.find({
          author: userId,
        })
          .populate({
            path: 'mentions',
            select: 'name avatar slug isOnline offlinedAt',
          })
          .populate({
            path: 'author',
            select: 'name avatar slug isOnline offlinedAt',
          })
          .sort({ createdAt: -1 })
          .skip(+skip)
          .limit(+limit);
      }
    } else {
      if (!currentUser) {
        return [];
      }
      //otherwise, current user existed
      const friendsID = currentUser.friends;
      posts = await Post.find({
        author: { $in: friendsID },
        status: { $in: ['PUBLIC', 'FRIENDS'] },
      })
        .populate({
          path: 'author',
          select: 'name avatar slug isOnline offlinedAt',
        })
        .populate({
          path: 'mentions',
          select: 'name avatar slug isOnline offlinedAt',
        })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit);
    }

    const standardizedPosts = posts.map((post) => {
      const _post = post._doc;
      if (_post.files) {
        let files = _post.files.map((file) => {
          let _file = file._doc;
          _file.data = `data:${file.mimetype};base64,${file.data.toString(
            'base64'
          )}`;
          return { ..._file };
        });
        _post.files = files;
      }
      return { ..._post };
    });

    return standardizedPosts;
  },
  createPost: async (req, data, pubsub, notifyMentionedUsersInPost) => {
    const {
      text,
      shortenText,
      rawText,
      mentions,
      fileNames,
      fileMimetype,
      fileEncodings,
      status,
    } = data;
    const currentUserId = getAuthUser(req);
    const currentUser = await User.findById(currentUserId, {
      name: 1,
      avatar: 1,
      slug: 1,
      isOnline: 1,
      posts: 1,
    });
    if (!currentUser) {
      throw new AuthenticationError('User not found');
    }
    if (!status || !POST_STATUS_ENUM[status]) {
      throw new UserInputError(
        "Mentions has item not match with User's friends"
      );
    }
    //convert base 64 images to buffer
    const decodeBase64FileData = fileEncodings.map((encoding) => {
      const { data } = decodeBase64(encoding);
      return data;
    });

    let fileData = [];
    if (
      fileNames.length !== fileMimetype.length &&
      fileNames.length !== fileEncodings.length
    ) {
      throw new UserInputError('Length of file not correct');
    }

    for (let i = 0; i < fileNames.length; i++) {
      fileData.push({
        data: decodeBase64FileData[i],
        mimetype: fileMimetype[i],
        filename: fileNames[i],
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const newPost = new Post({
      text,
      shortenText,
      rawText,
      mentions,
      files: fileData,
      author: currentUserId,
      status,
    });
    currentUser.posts.push(newPost._id);
    await currentUser.save();
    await (
      await newPost.save()
    )
      .populate({
        path: 'mentions',
        select: 'name avatar slug isOnline offlinedAt',
      })
      .populate({ path: 'author', select: 'name avatar slug' })
      .execPopulate();
    //if has mentions, create notification to mentioner
    if (mentions.length && status.toUpperCase() !== 'PRIVATE') {
      for (let mentionId of mentions) {
        const newNotification = new Notification({
          field: fields.POST,
          content: contents.MENTIONED,
          creator: currentUserId,
          fieldIdentity: {
            post: newPost._id,
          },
          receiver: mentionId,
          url: `/${currentUser.slug}/posts/${newPost._id}`,
        });
        const mentioner = await User.findById(mentionId);
        mentioner.notifications.push(newNotification._id);
        await mentioner.save();
        await (await newNotification.save())
          .populate({ path: 'creator', select: 'name slug avatar' })
          .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
          .execPopulate();
        await pubsub.publish(notifyMentionedUsersInPost, {
          notifyMentionedUsersInPost: newNotification._doc,
        });
      }
    }

    await session.commitTransaction();
    session.endSession();
    let cloned_post = newPost._doc;
    cloned_post.files = cloned_post.files.map((file) => {
      let _file = { ...file };
      _file.data = `data:${file.mimetype};base64,${file.data.toString(
        'base64'
      )}`;
      return _file;
    });
    return cloned_post;
  },
  editPost: async (
    req,
    postId,
    data,
    pubsub,
    notifyMentionUsersInPost,
    editPostSubscription,
    removeMentionedNotificationSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId);
      if (!currentUser) {
        const error = new Error('Author is undetermined');
        error.statusCode = 404;
        throw error;
      }
      const post = await Post.findOne({ _id: postId, author: currentUserId });
      if (!post) {
        const error = new Error('Edit post failed');
        error.statusCode = 404;
        throw error;
      }
      const {
        text,
        shortenText,
        rawText,
        mentions,
        fileNames,
        fileMimetype,
        fileEncodings,
        status,
      } = data;

      const session = await mongoose.startSession();
      session.startTransaction();

      //remove notification of mentions in old post
      for (let oldMentionId of post.mentions) {
        const oldNotification = await Notification.findOneAndDelete({
          field: fields.POST,
          content: contents.MENTIONED,
          creator: currentUserId,
          receiver: oldMentionId,
          'fieldIdentity.post': post._id,
        });
        await pubsub.publish(removeMentionedNotificationSubscription, {
          removeMentionedNotificationSubscription: oldNotification._doc,
        });
      }

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { text, shortenText, rawText, mentions, status },
        { new: true }
      )
        .populate({
          path: 'mentions',
          select: 'name avatar slug isOnline offlinedAt',
        })
        .populate({ path: 'author', select: 'name avatar slug' });

      if (mentions.length && status !== POST_STATUS_ENUM.PRIVATE) {
        for (let mentionId of mentions) {
          const newNotification = new Notification({
            field: fields.POST,
            content: contents.MENTIONED,
            creator: currentUserId,
            receiver: mentionId,
            fieldIdentity: {
              post: post._id,
            },
            url: `/${currentUser.slug}/posts/${updatedPost._id}`,
          });
          const mentioner = await User.findById(mentionId);
          mentioner.notifications.push(newNotification._id);
          await mentioner.save();
          await (await newNotification.save())
            .populate({ path: 'creator', select: 'name slug avatar' })
            .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
            .execPopulate();
          await pubsub.publish(notifyMentionUsersInPost, {
            notifyMentionUsersInPost: newNotification._doc,
          });
        }
      }

      await pubsub.publish(editPostSubscription, {
        editPostSubscription: updatedPost,
      });

      await session.commitTransaction();
      session.endSession();

      return updatedPost;
    } catch (error) {
      console.log(error);
      raiseError(error.message, error.statusCode);
    }
  },
  likePost: async (
    req,
    postId,
    pubsub,
    likePostSubscriptionNotification,
    likePostSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);

      const post = await Post.findById(postId).populate({
        path: 'author',
        select: '_id name slug avatar',
      });
      if (!post || post.likes.includes(currentUserId)) {
        return false;
      }
      post.likes.push(currentUserId);
      await post.save();
      //create notification to notify user like post author
      //Firstly, check notification has existed
      if (currentUserId.toString() !== post.author._id.toString()) {
        const checkNotificationExisted = await Notification.findOne({
          'fieldIdentity.post': postId,
          content: contents.LIKED,
          creator: currentUserId,
        });
        if (!checkNotificationExisted) {
          const newNotification = new Notification({
            field: fields.POST,
            content: contents.LIKED,
            creator: currentUserId,
            fieldIdentity: {
              post: post._id,
            },
            receiver: post.author._id,
            url: `/${post.author.slug}/posts/${post._id}`,
          });
          //save notification into user model
          await User.findByIdAndUpdate(post.author._id, {
            $push: { notifications: newNotification._id },
          });
          //save notification
          await (await newNotification.save())
            .populate({ path: 'fieldIdentity.post' })
            .populate({ path: 'creator', select: 'name avatar slug' })
            .execPopulate();
          await pubsub.publish(likePostSubscriptionNotification, {
            likePostSubscriptionNotification: newNotification._doc,
          });
        }
      }
      await pubsub.publish(likePostSubscription, {
        likePostSubscription: post,
      });

      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  removeLikePost: async (
    req,
    postId,
    pubsub,
    removeLikePostSubscriptionNotification,
    removeLikePostSubscription
  ) => {
    const currentUserId = getAuthUser(req);
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: currentUserId } },
      { new: true }
    );
    //find notification user liked post and remove it
    const notification = await Notification.findOneAndDelete({
      field: fields.POST,
      content: contents.LIKED,
      'fieldIdentity.post': postId,
      creator: currentUserId,
    })
      .populate({ path: 'fieldIdentity.post' })
      .populate({ path: 'creator', select: 'name avatar slug' });
    if (notification) {
      await User.findByIdAndUpdate(notification.receiver, {
        $pull: { notifications: notification._id },
      });
      await pubsub.publish(removeLikePostSubscriptionNotification, {
        removeLikePostSubscriptionNotification: notification._doc,
      });
    }
    await pubsub.publish(removeLikePostSubscription, {
      removeLikePostSubscription: post,
    });
    return !!post;
  },
  updatePost: async (req, postId, data, pubsub, postActions) => {
    const { text, mentions, tags, images, status } = data;
    if (!title && !content && !status) {
      throw new UserInputError('Update Fail');
    }
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      'author'
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        'Post not found or unable to update'
      );
    }

    post.text = text;
    if (mentions) {
      const friends = user.friends.map((friend) => friend.toString());
      const setFriends = new Set(friends);
      let checkMatch = true;

      mentions.forEach((userId) => {
        checkMatch = setFriends.has(userId.toString()) && checkMatch;
      });
      if (!checkMatch) {
        throw new UserInputError('Mentions is not correct');
      }
      post.mentions = mentions;
    }
    if (images && images.length) {
      post.images = images;
    }
    if (tags) {
      post.tags = tags;
    }
    if (status) {
      post.status = status;
    }
    await (await post.save())
      .populate('author')
      .populate('mentions')
      .execPopulate();
    pubsub.publish(postActions, {
      postActions: {
        action: 'UPDATED',
        node: post,
      },
    });
    return post;
  },
  deletePost: async (req, postId, pubsub, postActions) => {
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      'author'
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        'Post not found or unable to update'
      );
    }
    await Post.findByIdAndDelete(postId);
    pubsub.publish(postActions, {
      postActions: {
        action: 'DELETED',
        node: post,
      },
    });
    return post;
  },
};
