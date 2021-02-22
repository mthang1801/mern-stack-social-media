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
        subscriptionActions.NOTIFY_RECEIVE_ADD_FRIEND
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
    unFollowUser : (_, args, {req}, info) => {
      return userController.unFollowUser(req, args. userId);
    }
  },
  User: {
    password: (_, args, ctx, info) => userController.hidePassword(),
  },
  Subscription: {
    notifyReceiveAddFriend: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(subscriptionActions.NOTIFY_RECEIVE_ADD_FRIEND),
        (payload, { userId }) => {
          return (
            payload.notifyReceiveAddFriend.receivers[0].toString() ===
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
            payload.rejectRequestToAddFriendSubscription.sender._id.toString() ===
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
  },
};
