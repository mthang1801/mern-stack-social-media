const { userController } = require('./user.controllers');
const { pubsub } = require('../pubsub');
const { subscriptionActions } = require('../schema/index');
const { withFilter } = require('apollo-server-express');
const constant = require('../config/constant');
exports.userResolvers = {
  Query: {
    users: (_, args, ctx, info) => {
      return userController.users();
    },
    loginUser: (_, args, ctx, info) => {
      return userController.loginUser(args.data);
    },
    loginUserWithGoogle: (_, args, ctx, info) => {
      return userController.loginUserWithGoogle(args.data);
    },
    fetchCurrentUser: (_, args, { req }, info) => {
      return userController.fetchCurrentUser(req);
    },
    fetchPersonalUser: (_, args, { req }, info) => {
      return userController.fetchPersonalUser(req, args.slug);
    },
    fetchFriends: (_, args, { req }, info) => {
      return userController.fetchFriends(
        req,
        args.skip || 0,
        args.limit || constant.CONTACT_FRIENDS_PER_PAGE,
        (args.except = []),
        (args.userId = null)
      );
    },
    //fetched received request, sent request and friends list
    fetchListContact: (_, args, { req }, info) => {
      return userController.fetchListContact(req);
    },
    fetchSentRequestToAddFriend: (_, args, { req }, info) => {
      return userController.fetchSentRequestToAddFriend(
        req,
        args.skip,
        args.limit
      );
    },
    fetchReceivedRequestToAddFriend: (_, args, { req }, info) => {
      return userController.fetchReceivedRequestToAddFriend(
        req,
        args.skip || 0,
        args.limit || constant.CONTACT_USERS_PER_PAGE
      );
    },
    searchFriends: (_, args, { req }, info) =>
      userController.searchFriends(req, args.search),
  },
  Mutation: {
    createUser: (_, args, ctx, info) => {
      return userController.createUser(args.data);
    },
    sendRequestToAddFriend: (_, args, { req }, info) => {
      return userController.sendRequestToAddFriend(
        req,
        args.receiverId,
        pubsub,
        subscriptionActions.SEND_REQUEST_TO_ADD_FRIEND
      );
    },
    rejectRequestToAddFriend: (_, args, { req }, info) => {
      return userController.rejectRequestToAddFriend(
        req,
        args.senderId,
        pubsub,
        subscriptionActions.REJECT_REQUEST_TO_ADD_FRIEND
      );
    },
    cancelRequestToAddFriend: (_, args, { req }, info) => {
      return userController.cancelRequestToAddFriend(
        req,
        args.receiverId,
        pubsub,
        subscriptionActions.CANCEL_REQUEST_TO_ADD_FRIEND
      );
    },
    followUser: (_, args, { req }, info) => {
      return userController.followUser(req, args.userId);
    },
    unFollowUser: (_, args, { req }, info) => {
      return userController.unFollowUser(req, args.userId);
    },
    acceptRequestToAddFriend: (_, args, { req }, info) => {
      return userController.acceptRequestToAddFriend(
        req,
        args.senderId,
        pubsub,
        subscriptionActions.ACCEPT_REQUEST_TO_ADD_FRIEND
      );
    },
    removeFriend: (_, args, { req }, info) => {
      return userController.removeFriend(
        req,
        args.friendId,
        pubsub,
        subscriptionActions.REMOVE_FRIEND
      );
    },
  },
  User: {
    password: (_, args, ctx, info) => userController.hidePassword(),
  },
  Subscription: {
    sentRequestToAddFriendSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(subscriptionActions.SEND_REQUEST_TO_ADD_FRIEND),
        (payload, { userId }) =>
          payload.sentRequestToAddFriendSubscription.receiver.toString() ===
          userId.toString()
      ),
    },
    cancelRequestToAddFriendSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.CANCEL_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) =>
          payload.cancelRequestToAddFriendSubscription.receiver.toString() ===
          userId.toString()
      ),
    },
    rejectRequestToAddFriendSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.REJECT_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) => {
          return (
            payload.rejectRequestToAddFriendSubscription.sender._id.toString() ===
            userId.toString()
          );
        }
      ),
    },
    acceptRequestToAddFriendSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.ACCEPT_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) => {
          return (
            payload.acceptRequestToAddFriendSubscription.receiver.toString() ===
            userId.toString()
          );
        }
      ),
    },

    removeFriendSubscription: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.REMOVE_FRIEND),
        (payload, { userId }) => {
          return (
            payload.removeFriendSubscription.receiver._id.toString() ===
            userId.toString()
          );
        }
      ),
    },
  },
};
