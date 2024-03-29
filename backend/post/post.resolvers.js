const { postControllers } = require('./post.controllers');
const { pubsub } = require('../pubsub');
const { withFilter } = require('apollo-server-express');
const { subscriptionActions } = require('../schema/schema.subscription');
exports.postResolvers = {
  Query: {
    fetchPosts: (_, args, { req }, info) => {
      return postControllers.fetchPosts(
        req,
        args.userId,
        args.skip,
        args.limit
      );
    },
  },
  Mutation: {
    createPost: (_, args, { req }, info) =>
      postControllers.createPost(
        req,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_MENTIONED_USERS_IN_POST
      ),
    editPost: (_, args, { req }, info) =>
      postControllers.editPost(
        req,
        args.postId,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_MENTIONED_USERS_IN_POST,
        subscriptionActions.EDIT_POST_SUBSCRIPTION,
        subscriptionActions.REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST
      ),
    likePost: (_, args, { req }, info) =>
      postControllers.likePost(
        req,
        args.postId,
        pubsub,
        subscriptionActions.LIKE_POST_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.LIKE_POST_SUBSCRIPTION
      ),
    removeLikePost: (_, args, { req }, info) =>
      postControllers.removeLikePost(
        req,
        args.postId,
        pubsub,
        subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION
      ),
  },
  Subscription: {
    notifyMentionedUsersInPost: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTIONED_USERS_IN_POST
          ),
        (payload, { userId }) => {
          return (
            payload.notifyMentionedUsersInPost.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },
    likePostSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.LIKE_POST_SUBSCRIPTION_NOTIFICATION
        ),
    },
    likePostSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.LIKE_POST_SUBSCRIPTION),
    },
    removeLikePostSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION_NOTIFICATION
        ),
    },
    removeLikePostSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION),
    },
    editPostSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.EDIT_POST_SUBSCRIPTION),
    },
    removeMentionedNotificationSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST
          ),
        (payload, { userId }) =>
          payload.removeMentionedNotificationSubscription.receiver.toString() ===
          userId.toString()
      ),
    },
  },
};
