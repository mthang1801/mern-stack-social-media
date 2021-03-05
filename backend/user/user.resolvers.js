import { userController } from "./user.controllers";
import { pubsub } from "../pubsub";
import { subscriptionActions } from "../schema/index";
import { withFilter } from "apollo-server-express";
export const userResolvers = {
  Query: {
    users: (_, args, ctx, info) => {
      return userController.users();
    },
    loginUser: (_, args, ctx, info) => {
      return userController.loginUser(args.data);
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
        args.skip,
        args.limit,
        (args.userId = null)
      );
    },
    //fetched received request, sent request and friends list
    fetchListContact: (_, args, { req }, info) => {
      return userController.fetchListContact(req);
    },
    fetchUsersSentRequestToAddFriend: (_, args, { req }, info) => {
      return userController.fetchUsersSentRequestToAddFriend(
        req,
        args.skip,
        args.limit
      );
    },
    fetchUsersReceivedRequestToAddFriend: (_, args, { req }, info) => {
      return userController.fetchUsersReceivedRequestToAddFriend(
        req,
        args.skip || 0,
        args.limit || +process.env.CONTACT_USERS_PER_PAGE
      );
    },
    fetchUserFriends : (_, args, {req}, info) => {
      return userController.fetchUserFriends(req)
    }
  },
  Mutation: {
    createUser: (_, args, ctx, info) => {
      return userController.createUser(args.data);
    },
    sendRequestToAddFriend: (_, args, { req }, info) => {
      return userController.sendRequestToAddFriend(
        req,
        args.userId,
        pubsub,
        subscriptionActions.NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND
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
        subscriptionActions.NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND
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
    notifyReceivedRequestToAddFriend: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) => {
          return (
            payload.notifyReceivedRequestToAddFriend.receivers[0].toString() ===
            userId.toString()
          );
        }
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
            payload.rejectRequestToAddFriendSubscription.receiver._id.toString() ===
            userId.toString()
          );
        }
      ),
    },
    cancelRequestToAddFriendSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.CANCEL_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) => {
          return (
            payload.cancelRequestToAddFriendSubscription.receiver._id.toString() ===
            userId.toString()
          );
        }
      ),
    },
    notifyAcceptRequestToAddFriend: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND
          ),
        (payload, { userId }) => {
          return (
            payload.notifyAcceptRequestToAddFriend.receivers[0].toString() ===
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
