import { commentControllers } from "./comment.controllers";
import { pubsub } from "../pubsub";
import { subscriptionActions } from "../schema";
import { withFilter } from "apollo-server-express";
export const commentResolvers = {
  Query: {
    fetchComments: (_, args, { req }, info) =>
      commentControllers.fetchComments(
        req,
        args.postId,
        args.except,
        args.skip || 0,
        args.limit || +process.env.COMMENTS_PER_POST
      ),
  },
  Mutation: {
    createComment: (_, args, { req }, info) =>
      commentControllers.createComment(
        req,
        args.postId,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_MENTIONED_USERS_IN_COMMENT,
        subscriptionActions.NOTIFY_USER_COMMENT_POST_SUBSCRIPTION
      ),
    removeComment: (_, args, { req }, info) =>
      commentControllers.removeComment(req, args.commentId),
    likeComment: (_, args, { req }, info) =>
      commentControllers.likeComment(
        req,
        args.commentId,
        pubsub,
        subscriptionActions.LIKE_COMMENT_SUBSCRIPTION
      ),
    removeLikeComment: (_, args, { req }) =>
      commentControllers.removeLikeComment(req, args.commentId, pubsub, subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION),
  },
  Subscription: {
    notifyMentionUsersInComment: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTIONED_USERS_IN_COMMENT
          ),
        (payload, { userId }) => {
          console.log(payload, userId);
          return (
            payload.notifyMentionUsersInComment.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },
    notifyUserCommentPostSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_USER_COMMENT_POST_SUBSCRIPTION
          ),
        (payload, { userId }) => {
          return (
            payload.notifyUserCommentPostSubscription.notification.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },
    likeCommentSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.LIKE_COMMENT_SUBSCRIPTION
          ),
        (payload, { userId }) => {             
          return (
            payload.likeCommentSubscription.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },
    removeLikeCommentSubscription : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION), 
        (payload, {userId}) => {          
          return payload.removeLikeCommentSubscription.receiver.toString() === userId.toString()
        }
      )
    }
  },
};
