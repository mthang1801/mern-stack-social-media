import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import { Notification } from "../notification/notification.model";
import mongoose from "mongoose";
import { POST_STATUS_ENUM } from "./post.model";
import {
  UserInputError,
  AuthenticationError,
  ApolloError,
} from "apollo-server-express";
import { fields, contents } from "../notification";
import decodeBase64 from "../utils/decodeBase64";

export const postControllers = {
  fetchPosts: async (req, userId, skip, limit) => {
    console.time("fetch Posts");
    const currentUserId = getAuthUser(req, false);
    const currentUser = await User.findById(currentUserId);
    if (userId) {
      const Posts = await Post.find({
        $and: [
          { author: userId },
          {
            $or: [
              { status: "friends", friends: currentUserId },
              { status: "public" },
            ],
          },
        ],
      })
        .populate({
          path: "mentions",
          select: "name avatar slug isOnline offlinedAt",
        })
        .populate({
          path: "author",
          select: "name avatar slug isOnline offlinedAt",
        })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit);
      return Posts;
    }
    if (currentUser) {
      const friendsID = currentUser.friends;
      console.log(friendsID)
      const posts = await Post.find({
        author: { $in: friendsID },
        status: { $in: ["PUBLIC", "FRIENDS"] },
      })
        .populate({
          path: "author",
          select: "name avatar slug isOnline offlinedAt",
        })
        .populate({
          path: "mentions",
          select: "name avatar slug isOnline offlinedAt",
        })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit);
      const standardizedPosts = posts.map((post) => {
        const _post = post._doc;
        if (_post.files) {
          let files = _post.files.map((file) => {
            let _file = file._doc;
            _file.data = `data:${file.mimetype};base64,${file.data.toString(
              "base64"
            )}`;
            return { ..._file };
          });
          _post.files = files;
        }
        return { ..._post };
      });
      console.timeEnd("fetch Posts");
      return standardizedPosts;
    }
    return [];
  },
  createPost: async (req, data, pubsub, notifyMentionUsersInPost) => {
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
      throw new AuthenticationError("User not found");
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
      throw new UserInputError("Length of file not correct");
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
    await (await newPost.save())
      .populate({
        path: "mentions",
        select: "name avatar slug isOnline offlinedAt",
      })
      .populate({ path: "author", select: "name avatar slug" })
      .execPopulate();
    //if has mentions, create notification to mentioner
    if (mentions.length && status.toUpperCase() !== "PRIVATE") {
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
          .populate({ path: "creator", select: "name slug avatar" })
          .populate({ path: "fieldIdentity.post", select: "shortenText" })
          .execPopulate();
        await pubsub.publish(notifyMentionUsersInPost, {
          notifyMentionUsersInPost: newNotification._doc,
        });
      }
    }

    await session.commitTransaction();
    session.endSession();
    return newPost;
  },
  likePost: async (req, postId, pubsub, likePostSubscription) => {
    try {
      const currentUserId = getAuthUser(req);
      const post = await Post.findById(postId).populate({
        path: "author",
        select: "name slug",
      });
      if (!post || post.likes.includes(currentUserId)) {
        return false;
      }
      //create notification to notify user like post author
      //Firstly, check notification has existed
      const checkNotificationExisted = await Notification.findOne({
        "fieldIdentity.post": postId,
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
          .populate({ path: "fieldIdentity.post", select: "shrotenText" })
          .populate({ path: "creator", select: "name avatar slug" })
          .execPopulate();

        await pubsub.publish(likePostSubscription, {
          likePostSubscription: newNotification._doc,
        });
      }
      post.likes.push(currentUserId);
      await post.save();
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  removeLikePost: async (req, postId, pubsub, removeLikePostSubscription) => {
    const currentUserId = getAuthUser(req);
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: currentUserId } },
      { new: true }
    );
    //find notification user liked post and remove it
    const notification = await Notification.findOneAndDelete({
      field: fields.POST,
      "fieldIdentity.post": postId,
      creator: currentUserId,
    })
      .populate({ path: "fieldIdentity.post", select: "shrotenText" })
      .populate({ path: "creator", select: "name avatar slug" });
    if (notification) {
      await User.findByIdAndUpdate(notification.receiver, {
        $pull: { notifications: notification._id },
      });
      await pubsub.publish(removeLikePostSubscription, {
        removeLikePostSubscription: notification._doc,
      });
    }
    return !!post;
  },
  updatePost: async (req, postId, data, pubsub, postActions) => {
    const { text, mentions, tags, images, status } = data;
    if (!title && !content && !status) {
      throw new UserInputError("Update Fail");
    }
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      "author"
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        "Post not found or unable to update"
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
        throw new UserInputError("Mentions is not correct");
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
      .populate("author")
      .populate("mentions")
      .execPopulate();
    pubsub.publish(postActions, {
      postActions: {
        action: "UPDATED",
        node: post,
      },
    });
    return post;
  },
  deletePost: async (req, postId, pubsub, postActions) => {
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      "author"
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        "Post not found or unable to update"
      );
    }
    await Post.findByIdAndDelete(postId);
    pubsub.publish(postActions, {
      postActions: {
        action: "DELETED",
        node: post,
      },
    });
    return post;
  },
};
