import { Response } from './response.model';
import getAuthUser from '../utils/getAuthUser';
import { User } from '../user/user.model';
import { Comment } from '../comment/comment.model';
import { Post } from '../post/post.model';
import { Notification } from '../notification/notification.model';
import {
  ApolloError,
  AuthenticationError,
  ValidationError,
} from 'apollo-server-express';
import { fields, contents } from '../notification';
import mongoose from 'mongoose';
export const responseControllers = {
  fetchResponses: async (commentId, skip, limit) => {
    try {
      console.log(commentId, skip, limit);
      const comment = await Comment.findById(commentId).populate({
        path: 'responses',
        populate: { path: 'author', select: 'name avatar slug' },
        options: { sort: { createdAt: -1 }, skip, limit },
      });
      return comment.responses;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error.message);
    }
  },
  createResponse: async (
    req,
    commentId,
    data,
    pubsub,
    notifyUserResponseCommentSubscription,
    notifyMentionedUsersInResponse,
    createResponseSubscription
  ) => {
    try {
      const { text, rawText, shortenText, mentions } = data;
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId);
      if (!currentUser) {
        throw new AuthenticationError('User not found');
      }
      const comment = await Comment.findById(commentId);
      if (!comment) {
        throw new ValidationError('Comment not found');
      }
      const post = await Post.findById(comment.post).populate({
        path: 'author',
        select: 'name slug',
      });

      const newResponse = new Response({
        text,
        rawText,
        shortenText,
        mentions,
        post: post._id,
        author: currentUserId,
        comment: commentId,
      });

      const session = await mongoose.startSession();
      session.startTransaction();
      //push new responses to user
      currentUser.responses.push(newResponse._id);
      await currentUser.save();

      if (mentions.length) {
        for (let mentionId of mentions) {
          let notification = await Notification.findOneAndUpdate(
            {
              field: fields.RESPONSE,
              content: contents.MENTIONED,
              creator: currentUserId,
              receiver: mentionId,
              'fieldIdentity.post': post._id,
              'fieldIdentity.comment': commentId,
            },
            { updatedAt: Date.now(), hasSeen: false },
            { new: true }
          )
            .populate({ path: 'creator', select: 'name slug avatar' })
            .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
            .populate({
              path: 'fieldIdentity.comment',
              select: 'shortenText',
            });
          if (!notification) {
            //create new notification to mentionId
            notification = new Notification({
              field: fields.RESPONSE,
              content: contents.MENTIONED,
              creator: currentUserId,
              receiver: mentionId,
              fieldIdentity: {
                post: post._id,
                comment: comment._id,
                response: newResponse._id,
              },
              url: `/${post.author.slug}/posts/${post._id}?comment=${comment._id}&response=${newResponse._id}`,
            });
            await (
              await notification.save()
            )
              .populate({ path: 'creator', select: 'name slug avatar' })
              .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
              .populate({
                path: 'fieldIdentity.comment',
                select: 'shortenText',
              })
              .execPopulate();
          }
          if (mentionId.toString() !== currentUserId.toString()) {
            const mentioner = await User.findById(mentionId);
            if (!mentioner.notifications.includes(notification._id)) {
              mentioner.notifications.push(notification._id);
            }

            await mentioner.save();
            //pubsub
            await pubsub.publish(notifyMentionedUsersInResponse, {
              notifyMentionedUsersInResponse: notification._doc,
            });
          }
        }
      }

      await (
        await newResponse.save()
      )
        .populate({
          path: 'author',
          select: 'name avatar slug isOnline offlinedAt',
        })
        .execPopulate();

      //create notification to notify owner comment realize user has response and push responseSponse to comment
      if (currentUserId.toString() !== comment.author.toString()) {
        let notificationForOwnerComment = await Notification.findOneAndUpdate(
          {
            field: fields.RESPONSE,
            content: contents.CREATED,
            'fieldIdentity.post': post._id,
            'fieldIdentity.comment': commentId,
            receiver: comment.author,
          },
          { updatedAt: Date.now(), hasSeen: false },
          { new: true }
        )
          .populate({ path: 'creator', select: 'name slug avatar' })
          .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
          .populate({
            path: 'fieldIdentity.comment',
            select: 'shortenText',
          });
        if (!notificationForOwnerComment) {
          notificationForOwnerComment = new Notification({
            field: fields.RESPONSE,
            content: contents.CREATED,
            fieldIdentity: {
              post: post._id,
              comment: comment._id,
              response: newResponse._id,
            },
            creator: currentUserId,
            receiver: comment.author,
            url: `/${post.author.slug}/posts/${post._id}?comment=${comment._id}&response=${newResponse._id}`,
          });
          await (
            await notificationForOwnerComment.save()
          )
            .populate({ path: 'creator', select: 'name slug avatar' })
            .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
            .populate({
              path: 'fieldIdentity.comment',
              select: 'shortenText',
            })
            .execPopulate();
        }
        //create pubsub to notify user response comment
        await pubsub.publish(notifyUserResponseCommentSubscription, {
          notifyUserResponseCommentSubscription:
            notificationForOwnerComment._doc,
        });
        //push notification to owner Post
        await User.findByIdAndUpdate(comment.author, {
          $addToSet: { notifications: notificationForOwnerComment._id },
        });
      }

      // push response to post
      post.responses.push(newResponse._id);
      await post.save();
      //push repsonse to comment
      comment.responses.push(newResponse._id);
      await comment.save();

      await pubsub.publish(createResponseSubscription, {
        createResponseSubscription: newResponse._doc,
      });

      await session.commitTransaction();
      session.endSession();
      return newResponse;
    } catch (error) {
      console.log(error);
    }
  },
  likeResponse: async (
    req,
    responseId,
    pubsub,
    likeResponseSubscriptionNotification,
    likeResponseSubscription
  ) => {
    const currentUserId = getAuthUser(req);
    const response = await Response.findById(responseId)
      .populate({
        path: 'post',
        populate: { path: 'author', select: 'slug' },
      })
      .populate({ path: 'author', select: '_id name avatar slug' });
    if (!response || response.likes.includes(currentUserId.toString())) {
      return false;
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    //create notification to like response
    if (currentUserId.toString() !== response.author._id.toString()) {
      let notification = await Notification.findOneAndUpdate(
        {
          field: fields.RESPONSE,
          content: contents.LIKED,
          fieldIdentity: {
            post: response.post._id,
            comment: response.comment,
            response: response._id,
          },
          creator: currentUserId,
          receiver: response.author,
        },
        { hasSeen: false }
      )
        .populate({ path: 'creator', select: 'name slug avatar' })
        .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
        .populate({
          path: 'fieldIdentity.comment',
          select: 'shortenText',
        })
        .populate({
          path: 'fieldIdentity.response',
          select: '_id',
        });
      if (!notification) {
        notification = new Notification({
          field: fields.RESPONSE,
          content: contents.LIKED,
          fieldIdentity: {
            post: response.post._id,
            comment: response.comment,
            response: response._id,
          },
          creator: currentUserId,
          receiver: response.author,
          url: `/${response.post.author.slug}/posts/${response.post._id}?comment=${response.comment}&response=${response._id}`,
        });
        await (
          await notification.save()
        )
          .populate({ path: 'creator', select: 'name slug avatar' })
          .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
          .populate({
            path: 'fieldIdentity.comment',
            select: 'shortenText',
          })
          .populate({
            path: 'fieldIdentity.response',
            select: '_id',
          })
          .execPopulate();
        //save notification in user
        await User.findByIdAndUpdate(response.author, {
          $addToSet: { notifications: notification._id },
        });
      }
      await pubsub.publish(likeResponseSubscriptionNotification, {
        likeResponseSubscriptionNotification: notification._doc,
      });
    }
    response.likes.push(currentUserId);
    await response.save();
    await session.commitTransaction();
    session.endSession();

    await pubsub.publish(likeResponseSubscription, {
      likeResponseSubscription: { ...response._doc, post: response.post._id },
    });
    console.log({ ...response._doc, post: response.post._id });

    return true;
  },
  removeLikeResponse: async (
    req,
    responseId,
    pubsub,
    removeLikeResponseSubscriptionNotification,
    removeLikeResponseSubscription
  ) => {
    const currentUserId = getAuthUser(req);
    const response = await Response.findById(responseId).populate({
      path: 'author',
      select: '_id name avatar slug',
    });

    if (!response || !response.likes.includes(currentUserId.toString())) {
      return false;
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    response.likes.pull(currentUserId);
    await response.save();

    //check notification and delete
    if (currentUserId.toString() !== response.author.toString()) {
      let notification = await Notification.findOneAndDelete({
        field: fields.RESPONSE,
        content: contents.LIKED,
        fieldIdentity: {
          post: response.post,
          comment: response.comment,
        },
        creator: currentUserId,
        receiver: response.author,
      })
        .populate({ path: 'creator', select: 'name slug avatar' })
        .populate({ path: 'fieldIdentity.post', select: 'shortenText' })
        .populate({
          path: 'fieldIdentity.comment',
          select: 'shortenText',
        })
        .populate({
          path: 'fieldIdentity.response',
          select: '_id',
        });
      if (notification) {
        await pubsub.publish(removeLikeResponseSubscriptionNotification, {
          removeLikeResponseSubscriptionNotification: notification._doc,
        });
      }
    }

    await session.commitTransaction();
    session.endSession();
    await pubsub.publish(removeLikeResponseSubscription, {
      removeLikeResponseSubscription: response._doc,
    });
    return true;
  },
  removeResponse: async (req, responseId) => {
    try {
      const currentUserId = getAuthUser(req);
      const response = await Response.findOne({
        _id: responseId,
        author: currentUserId,
      });
      if (!response) {
        return false;
      }
      const session = await mongoose.startSession();
      session.startTransaction();

      //remove response in post
      await Post.findByIdAndUpdate(response.post, {
        $pull: { responses: responseId },
      });
      //remove response in comment
      await Comment.findByIdAndUpdate(response.comment, {
        $pull: { responses: responseId },
      });
      //remove response in author
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { responses: responseId },
      });
      //remove response
      await Response.findByIdAndDelete(responseId);

      //remove notifications relate response
      let notifications = await Notification.find({
        'fieldIdentity.response': responseId,
      });
      for (let notification of notifications) {
        await Notification.findByIdAndDelete(notification._id);
        await User.findOneAndUpdate(
          { notifications: notification._id },
          { $pull: { notifications: notification._id } }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error.message);
    }
  },
};
