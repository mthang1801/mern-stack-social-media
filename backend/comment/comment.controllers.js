const getAuthUser = require('../utils/getAuthUser');
const {
  ApolloError,
  ValidationError,
  CheckResultAndHandleErrors,
  UserInputError,
} = require('apollo-server-express');
const mongoose = require('mongoose');
const { Post } = require('../post/post.model');
const { Comment } = require('./comment.model');
const { User } = require('../user/user.model');
const { Notification } = require('../notification/notification.model');
const { Response } = require('../response/response.model');
const { contents, fields } = require('../notification');
const constant = require('../config/constant');
exports.commentControllers = {
  fetchComments: async (
    req,
    postId,
    except = [],
    skip = 0,
    limit = constant.POSTS_PER_PAGE
  ) => {
    try {
      let post;
      if (except.length) {
        post = await Post.findById(postId).populate({
          path: 'comments',
          match: { _id: { $nin: except } },
          populate: {
            path: 'author',
            select: 'name avatar slug isOnline offlinedAt',
          },
          options: { sort: { createdAt: -1 }, skip, limit },
        });
      } else {
        post = await Post.findById(postId).populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'name avatar slug isOnline offlinedAt',
          },
          options: { sort: { createdAt: -1 }, skip, limit },
        });
      }

      return post.comments;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  createComment: async (
    req,
    postId,
    data,
    pubsub,
    notifyMentionUsersInComment,
    notifyUserCommentPostSubscription,
    createCommentSubscription
  ) => {
    try {
      const { text, mentions, shortenText, rawText } = data;

      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId);
      if (text) {
        const post = await Post.findById(postId);

        if (!post) {
          throw new ApolloError('Post not found');
        }
        const newComment = new Comment({
          text,
          shortenText,
          rawText,
          mentions,
          author: currentUserId,
          post: postId,
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        if (mentions.length) {
          //loop and create notification to mentions in comment
          for (let mentionId of mentions) {
            let notification = await Notification.findOneAndUpdate(
              {
                field: fields.COMMENT,
                content: contents.MENTIONED,
                'fieldIdentity.post': postId,
                creator: currentUserId,
                receiver: mentionId,
              },
              { updatedAt: Date.now(), hasSeen: false },
              { new: true }
            )
              .populate({ path: 'creator', select: 'slug name avatar' })
              .populate({ path: 'fieldIdentity.post', select: 'shortenText' });
            if (!notification) {
              notification = new Notification({
                field: fields.COMMENT,
                content: contents.MENTIONED,
                fieldIdentity: {
                  post: postId,
                },
                creator: currentUserId,
                receiver: mentionId,
                url: `/${currentUser.slug}/posts/${post._id}?comment=${newComment._id}`,
              });
              if (mentionId.toString() !== currentUserId.toString()) {
                const mentioner = await User.findById(mentionId);
                if (!mentioner.notifications.includes(notification._id)) {
                  mentioner.notifications.push(notification._id);
                }

                await mentioner.save();
                await (
                  await notification.save()
                )
                  .populate({ path: 'creator', select: 'name slug avatar' })
                  .populate({
                    path: 'fieldIdentity.post',
                    select: 'shortenText',
                  })
                  .execPopulate();
              }

              await pubsub.publish(notifyMentionUsersInComment, {
                notifyMentionUsersInComment: notification._doc,
              });
            }
          }
        }

        //save new comment
        await (
          await newComment.save()
        )
          .populate({
            path: 'author',
            select: 'name avatar slug isOnline offlinedAt',
          })
          .execPopulate();

        //create notification to notify owner post realize user has commented and push usersComment to post
        if (currentUserId.toString() !== post.author.toString()) {
          let notificationForOwnerPost = await Notification.findOneAndUpdate(
            {
              field: fields.COMMENT,
              content: contents.CREATED,
              'fieldIdentity.post': postId,
              creator: currentUserId,
              receiver: post.author,
            },
            { updatedAt: Date.now(), hasSeen: false },
            { new: true }
          )
            .populate({ path: 'creator', select: 'name slug avatar' })
            .populate({ path: 'fieldIdentity.post', select: 'shortenText' });
          if (!notificationForOwnerPost) {
            notificationForOwnerPost = new Notification({
              field: fields.COMMENT,
              content: contents.CREATED,
              fieldIdentity: {
                post: postId,
              },
              creator: currentUserId,
              receiver: post.author,
              url: `/${currentUser.slug}/posts/${post._id}?comment=${newComment._id}`,
            });
            //push notification to owner Post
            await User.findByIdAndUpdate(
              post.author,
              { $addToSet: { notifications: notificationForOwnerPost._id } },
              { new: true }
            );

            //save notification owner Post
            await (await notificationForOwnerPost.save())
              .populate('creator')
              .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
              .execPopulate();
          }
          await pubsub.publish(notifyUserCommentPostSubscription, {
            notifyUserCommentPostSubscription: notificationForOwnerPost._doc,
          });
        }

        //push comment to post
        post.comments.push(newComment._id);
        await post.save();
        //push comment to user
        currentUser.comments.push(newComment._id);
        await currentUser.save();

        await pubsub.publish(createCommentSubscription, {
          createCommentSubscription: newComment._doc,
        });
        await session.commitTransaction();
        session.endSession();
        return newComment;
      }
    } catch (error) {
      console.log(error.message);
      throw new ApolloError(error.message);
    }
  },
  removeComment: async (req, commentId) => {
    try {
      const currentUserId = getAuthUser(req);
      const comment = await Comment.findOne({
        _id: commentId,
        author: currentUserId,
      });
      if (!comment) {
        return false;
      }

      const session = await mongoose.startSession();
      session.startTransaction();
      //remove comment in post
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId, responses: { $in: comment.responses } },
      });
      //remove comment in author
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { comments: commentId, responses: { $in: comment.responses } },
      });
      //remove all responses of comment
      for (let responseId of comment.responses) {
        await Response.findByIdAndDelete(responseId);
      }
      //remove comment
      await Comment.findByIdAndDelete(commentId);
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  likeComment: async (
    req,
    commentId,
    pubsub,
    likeCommentSubscriptionNotification,
    likeCommentSubscription
  ) => {
    const currentUserId = getAuthUser(req);
    const comment = await Comment.findById(commentId).populate({
      path: 'author',
      select: 'slug name avatar',
    });
    if (!comment || comment.likes.includes(currentUserId.toString())) {
      return false;
    }
    comment.likes.push(currentUserId);
    await comment.save();
    let notification;
    if (currentUserId.toString() !== comment.author._id.toString()) {
      //create notification
      notification = new Notification({
        field: fields.COMMENT,
        content: contents.LIKED,
        fieldIdentity: {
          post: comment.post,
          comment: comment._id,
        },
        creator: currentUserId,
        receiver: comment.author._id,
        url: `/${comment.author.slug}/posts/${comment.post}`,
      });
      //when this is not author, notification will be created
      await User.findByIdAndUpdate(notification.receiver, {
        $push: { notifications: notification._id },
      });
      await (await notification.save())
        .populate({ path: 'creator', select: 'name slug avatar' })
        .populate('fieldIdentity.post')
        .populate({ path: 'fieldIdentity.comment', select: 'shortenText' })
        .execPopulate();

      await pubsub.publish(likeCommentSubscriptionNotification, {
        likeCommentSubscriptionNotification: notification,
      });
    }

    await pubsub.publish(likeCommentSubscription, {
      likeCommentSubscription: comment._doc,
    });

    return true;
  },
  removeLikeComment: async (
    req,
    commentId,
    pubsub,
    removeLikeCommentSubscriptionNotification,
    removeLikeCommentSubscription
  ) => {
    const currentUserId = getAuthUser(req);
    const comment = await Comment.findById(commentId).populate({
      path: 'author',
      select: 'slug name avatar',
    });
    if (!comment || !comment.likes.includes(currentUserId)) {
      return false;
    }
    comment.likes.pull(currentUserId);
    await comment.save();
    //remove notification
    const removedNotification = await Notification.findOneAndDelete({
      field: fields.COMMENT,
      content: contents.LIKED,
      'fieldIdentity.post': comment.post,
      'fieldIdentity.comment': comment._id,
      creator: currentUserId,
      receiver: comment.author,
    })
      .populate({ path: 'creator', select: 'name avatar slug' })
      .populate({ path: 'fieldIdentity.post', select: '_id' })
      .populate({ path: 'fieldIdentity.comment', select: '_id' });

    if (removedNotification) {
      await pubsub.publish(removeLikeCommentSubscriptionNotification, {
        removeLikeCommentSubscriptionNotification: removedNotification._doc,
      });
    }
    await pubsub.publish(removeLikeCommentSubscription, {
      removeLikeCommentSubscription: comment._doc,
    });
    return true;
  },
};
