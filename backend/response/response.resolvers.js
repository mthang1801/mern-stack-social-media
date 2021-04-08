import { responseControllers } from "./response.controllers";
import { pubsub } from "../pubsub";
import { subscriptionActions } from "../schema";
import { withFilter } from "apollo-server-express";

export const responseResolvers = {
  Query: {
    fetchResponses: (_, args, { req }, info) =>
      responseControllers.fetchResponses(
        args.commentId,
        args.skip || 0,
        args.limit || +process.env.COMMENTS_PER_POST
      ),
  },
  Mutation: {
    createResponse: (_, args, { req }, info) =>
      responseControllers.createResponse(
        req,
        args.commentId,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_USER_RESPONSE_COMMENT,
        subscriptionActions.NOTIFY_MENTIONED_USERS_IN_RESPONSE,
        subscriptionActions.CREATE_RESPONSE_SUBSCRIPTION
      ),
    likeResponse: (_, args, { req }, info) =>
      responseControllers.likeResponse(
        req,
        args.responseId,
        pubsub,
        subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION
      ),
    removeLikeResponse: (_, args, { req }, info) =>
      responseControllers.removeLikeResponse(req, args.responseId, pubsub, subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION),
    removeResponse: (_, args, { req }) =>
      responseControllers.removeResponse(req, args.responseId),
  },
  Subscription: {
    notifyUserResponseCommentSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_USER_RESPONSE_COMMENT
          ),
        (payload, { userId }) =>
          payload.notifyUserResponseCommentSubscription.receiver.toString() ===
          userId.toString()
      ),
    },
    notifyMentionedUsersInResponse: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTIONED_USERS_IN_RESPONSE
          ),
        (payload, { userId }) =>
          payload.notifyMentionedUsersInResponse.receiver.toString() ===
          userId.toString()
      ),
    },
    createResponseSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.CREATE_RESPONSE_SUBSCRIPTION),
    },
    likeResponseSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION),
    },
    removeLikeResponseSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION
        ),
    },
  },
};
