const { responseControllers } = require('./response.controllers');
const { pubsub } = require('../pubsub');
const { subscriptionActions } = require('../schema/schema.subscription');
const { withFilter } = require('apollo-server-express');
const constant = require('../config/constant');
exports.responseResolvers = {
  Query: {
    fetchResponses: (_, args, { req }, info) =>
      responseControllers.fetchResponses(
        args.commentId,
        (args.skip = 0),
        (args.limit = constant.COMMENTS_PER_POST)
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
        subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION
      ),
    removeLikeResponse: (_, args, { req }, info) =>
      responseControllers.removeLikeResponse(
        req,
        args.responseId,
        pubsub,
        subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION
      ),
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
    likeResponseSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION
        ),
    },
    likeResponseSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.LIKE_RESPONSE_SUBSCRIPTION),
    },
    removeLikeResponseSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION
        ),
    },
    removeLikeResponseSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_RESPONSE_SUBSCRIPTION
        ),
    },
  },
};
