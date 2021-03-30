import getAuthUser from "../utils/getAuthUser";
import {
  CheckResultAndHandleErrors,
  UserInputError,
} from "apollo-server-express";
import mongoose from "mongoose";
import { Post } from "../post/post.model";
import { Comment } from "./comment.model";
import { User } from "../user/user.model";
import { Notification } from "../notification/notification.model";
import { fields, actions } from "../fields-actions";
export const commentControllers = {
  createComment: async (
    req,
    postId,
    data,
    pubsub,
    notifyMentionUsersInComment,
    notifyOwnerPostUserComment
  ) => {
    try {
      const { text, mentions } = data;

      const currentUserId = getAuthUser(req);
      if (text) {
        const post = await Post.findById(postId);

        if (!post) {
          throw new ApolloError("Post not found");
        }
        const newComment = new Comment({
          text,
          mentions,
          author: currentUserId,
          post: postId,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        if (mentions.length) {
          //create notification to mentions in comment
          const newNotification = new Notification({
            field: fields.comment,
            action: actions.MENTION,
            creator: currentUserId,
            receivers: mentions,
            href: `/posts/${post._id}`,
          });
          for (let mentionId of mentions) {
            const mentioner = await User.findById(mentionId);
            mentioner.notifications.push(newNotification._id);
            await mentioner.save();
          }
          await (await newNotification.save())
            .populate("creator")
            .execPopulate();
          await pubsub.publish(notifyMentionUsersInComment, {
            notifyMentionUsersInComment: { ...newNotification._doc },
          });
        }
        //create notification to notify owner post realize user has commented
        const ownerNotification = new Notification({
          field: fields.comment,
          action: actions.CREATED,
          creator: currentUserId,
          receivers: [post.author],
          href: `/posts/${post._id}`,
        });
        //push comment to post
        post.comments.push(newComment._id);
        await post.save();
        //push comment to user
        await User.findByIdAndUpdate(currentUserId, {
          $push: { comments: newComment._id },
        });
        //push notification to owner Post
        await User.findByIdAndUpdate(
          post.author,
          { $push: { notifications: ownerNotification._id } },
          { new: true }
        );
        //save notification owner Post
        await (await ownerNotification.save())
          .populate("creator")
          .execPopulate();
        //save new comment
        await (await newComment.save())
          .populate({
            path: "author",
            select: "name avatar slug isOnline offlinedAt",
          })
          .execPopulate();
        await pubsub.publish(notifyOwnerPostUserComment, {
          notifyOwnerPostUserComment: {
            comment: newComment,
            notification: ownerNotification,
          },
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
};
