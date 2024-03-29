const { commentControllers } = require('./comment.controllers');
const { pubsub } = require('../pubsub');
const { subscriptionActions } = require('../schema/schema.subscription');
const { withFilter } = require('apollo-server-express');
exports.commentResolvers = {
  Query: {
    fetchComments: (_, args, { req }, info) =>
      commentControllers.fetchComments(
        req,
        args.postId,
        args.except,
        args.skip,
        args.limit
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
        subscriptionActions.NOTIFY_USER_COMMENT_POST_SUBSCRIPTION,
        subscriptionActions.CREATE_COMMENT_SUBSCIPTION
      ),
    removeComment: (_, args, { req }, info) =>
      commentControllers.removeComment(req, args.commentId),
    likeComment: (_, args, { req }, info) =>
      commentControllers.likeComment(
        req,
        args.commentId,
        pubsub,
        subscriptionActions.LIKE_COMMENT_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.LIKE_COMMENT_SUBSCRIPTION
      ),
    removeLikeComment: (_, args, { req }) =>
      commentControllers.removeLikeComment(
        req,
        args.commentId,
        pubsub,
        subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION_NOTIFICATION,
        subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION
      ),
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
            payload.notifyUserCommentPostSubscription.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },
    createCommentSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.CREATE_COMMENT_SUBSCIPTION),
    },
    likeCommentSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.LIKE_COMMENT_SUBSCRIPTION_NOTIFICATION
        ),
    },
    likeCommentSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(subscriptionActions.LIKE_COMMENT_SUBSCRIPTION),
    },
    removeLikeCommentSubscriptionNotification: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION_NOTIFICATION
        ),
    },
    removeLikeCommentSubscription: {
      subscribe: () =>
        pubsub.asyncIterator(
          subscriptionActions.REMOVE_LIKE_COMMENT_SUBSCRIPTION
        ),
    },
  },
};
