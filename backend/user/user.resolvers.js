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
        (payload, { userId }) =>{
          console.log(JSON.stringify(payload, null, 4))
          return payload.acceptRequestToAddFriendSubscription.receiver.toString() ===
          userId.toString()
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
