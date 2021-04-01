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
        subscriptionActions.NOTIFY_MENTIONS_USERS_IN_COMMENT,
        subscriptionActions.NOTIFY_OWNER_POST_USER_COMMENT
      ),
    removeComment : (_, args, {req}, info) => commentControllers.removeComment(req, args.commentId)
  },
  Subscription: {
    notifyMentionUsersInComment: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTIONS_USERS_IN_COMMENT
          ),
        (payload, { userId }) => {
          return payload.notifyMentionUsersInComment.receivers.includes(
            userId.toString()
          );
        }
      ),
    },
    notifyOwnerPostUserComment: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_OWNER_POST_USER_COMMENT
          ),
        (payload, { userId }) => {
          console.log(payload);
          return (
            payload.notifyOwnerPostUserComment.notification.receivers[0].toString() ===
            userId.toString()
          );
        }
      ),
    },
  },
};
