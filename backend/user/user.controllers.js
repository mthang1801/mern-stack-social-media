import { User } from "./user.model";
import {
  UserInputError,
  AuthenticationError,
  ApolloError,
} from "apollo-server-express";
import { generateToken } from "../utils/token";
import bcrypt from "bcryptjs";
import getAuthUser from "../utils/getAuthUser";
import { fields, actions } from "../fields-actions";
import { Notification } from "../notification/notification.model";
import mongoose from "mongoose";
import _ from "lodash";
export const userController = {
  users: () => User.find(),
  createUser: async (data) => {
    const { name, email, password } = data;
    if (!name) {
      throw new UserInputError("Name is requried");
    }
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(email)) {
      throw new UserInputError("Email is invalid");
    }
    if (password.length < 6) {
      throw new UserInputError("Password is too short");
    }
    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      throw new UserInputError("Email has been existing");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let slug = name.replace(/[^0-9A-Za-z]+/g, "_").toLowerCase();
    const checkSlugExisting = await User.findOne({ slug });
    if (checkSlugExisting) {
      slug = `${slug}_${Date.now().toString(36)}`;
    }
    const newUser = new User({
      name,
      slug,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return {
      user: newUser,
      token: generateToken(newUser._id),
      tokenExpire: process.env.JWT_TOKEN_EXPIRE,
    };
  },
  loginUser: async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email }).populate({
      path: "notifications",
      populate: { path: "creator" },
    });

    if (!user) {
      throw new UserInputError("email or password was not correct");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UserInputError("email or password was not correct");
    }
    return {
      user,
      token: generateToken(user._id),
      tokenExpire: process.env.JWT_TOKEN_EXPIRE,
    };
  },
  fetchCurrentUser: async (req) => {
    const userId = getAuthUser(req, false);
    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: { path: "creator" },
    });
    if (!user) {
      return null;
    }
    return user;
  },
  fetchPersonalUser: async (req, slug) => {
    const currentUserId = getAuthUser(req, false);
    const user = await User.findOne({ slug }).populate({
      path: "posts",
      match: {
        $or: [
          { friends: currentUserId, status: "friends" },
          { status: "public" },
        ],
      },
      populate: { path: "mentions" },
      options: { limit: +process.env.POSTS_PER_PAGE },
    });
    return user;
  },
  fetchListContact: async (req) => {
    const currentUserId = getAuthUser(req);
    const currentUser = await User.findById(currentUserId)
      .populate({
        path: "sentRequestToAddFriend",
        options: { limit: +process.env.CONTACT_USERS_PER_PAGE },
      })
      .populate({
        path: "receivedRequestToAddFriend",
        options: { limit: +process.env.CONTACT_USERS_PER_PAGE },
      })
      .populate({
        path: "friends",
        options: { limit: +process.env.CONTACT_FRIENDS_PER_PAGE, sort: {name : 1}, collation :{locale : "en"} },
      });
    if (!currentUser) {
      throw new AuthenticationError("User not found");
    }
    return {
      sentRequests: currentUser.sentRequestToAddFriend,
      receivedRequests: currentUser.receivedRequestToAddFriend,
      friends: currentUser.friends,
    };
  },
  fetchFriends: async (req, skip, limit, userId) => {
    const currentUserId = getAuthUser(req, false);
    if (userId) {
      //do something
      return [];
    }
    const friendsList = await User.find(
      { friends: currentUserId },
      { name: 1, slug: 1, avatar: 1 }
    )
      .collation({ locale: "en" })
      .sort({ name: 1 })
      .skip(+skip)
      .limit(+limit);

    return friendsList;
  },
  sendRequestToAddFriend: async (
    req,
    userId,
    pubsub,
    notifyReceivedRequestToAddFriend
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        friends: { $ne: userId },
        sentRequestToAddFriend: { $ne: userId },
        receivedRequestToAddFriend: { $ne: userId },
      });

      if (!currentUser) {
        throw new UserInputError("Add friend failed");
      }
      const userRequestedFriend = await User.findOne({
        _id: userId,
        friends: { $ne: currentUserId },
        sentRequestToAddFriend: { $ne: userId },
        receivedRequestToAddFriend: { $ne: userId },
      });
      if (!userRequestedFriend) {
        throw new UserInputError("Add friend failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      const notification = new Notification({
        field: fields.user,
        action: actions.ADDED,
        creator: currentUserId,
        receivers: [userId],
        href: `/${currentUser.slug}`,
      });
      await (await notification.save()).populate("creator").execPopulate();
      if (
        !userRequestedFriend.followed.includes(
          mongoose.Types.ObjectId(currentUserId)
        )
      ) {
        userRequestedFriend.followed.push(currentUserId);
      }
      userRequestedFriend.receivedRequestToAddFriend.unshift(currentUserId);
      userRequestedFriend.notifications.push(notification._id);
      await userRequestedFriend.save();

      if (!currentUser.following.includes(mongoose.Types.ObjectId(userId))) {
        currentUser.following.push(userId);
      }
      currentUser.sentRequestToAddFriend.unshift(userId);
      await currentUser.save();
      pubsub.publish(notifyReceivedRequestToAddFriend, {
        notifyReceivedRequestToAddFriend: {
          field: fields.user,
          action: actions.ADDED,
          sender: currentUser,
          receiver: userRequestedFriend,
          receivers: [userId],
          notification,
        },
      });
      await session.commitTransaction();
      session.endSession();
      return {
        sender: currentUser,
        receiver: userRequestedFriend,
      };
    } catch (error) {
      throw new ApolloError("Add friend failed.");
    }
  },
  fetchUsersSentRequestToAddFriend: async (req, skip, limit) => {    
    const currentUserId = await getAuthUser(req);
    const currentUser = await User.findById(currentUserId).populate({
      path: "sentRequestToAddFriend",
      options: { skip: +skip, limit: +limit },
    });
    return currentUser.sentRequestToAddFriend;
  },
  fetchUsersReceivedRequestToAddFriend: async (req, skip, limit) => {
    const currentUserId = await getAuthUser(req);
    const currentUser = await User.findById(currentUserId).populate({
      path: "receivedRequestToAddFriend",
      options: { skip: +skip, limit: +limit },
    });
    return currentUser.receivedRequestToAddFriend;
  }, 
  acceptRequestToAddFriend: async (
    req,
    senderId,
    pubsub,
    notifyAcceptRequestToAddFriend
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        receivedRequestToAddFriend: senderId,
      });
      if (!currentUser) {
        throw new UserInputError("Accept request failed");
      }
      const sender = await User.findOne({
        _id: senderId,
        sentRequestToAddFriend: currentUserId,
      });
      if (!sender) {
        throw new UserInputError("Accept request failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();

      const updatedCurrentUser = await User.findByIdAndUpdate(
        currentUserId,
        {
          $pull: { receivedRequestToAddFriend: senderId },
          $addToSet: {
            friends: senderId,
            following: senderId,
            followed: senderId,
          },
        },
        { new: true }
      );
      const notification = new Notification({
        field: fields.user,
        action: actions.ACCEPTED,
        creator: currentUserId,
        receivers: [senderId],
        href: `/${currentUser.slug}`,
      });
      await (await notification.save()).populate("creator").execPopulate();
      const updatedSenderRequest = await User.findByIdAndUpdate(
        senderId,
        {
          $pull: { sentRequestToAddFriend: currentUserId },
          $addToSet: {
            friends: currentUserId,
            following: currentUserId,
            followed: currentUserId,
          },
          $push: { notifications: notification._id },
        },
        { new: true }
      );
      pubsub.publish(notifyAcceptRequestToAddFriend, {
        notifyAcceptRequestToAddFriend: {
          field: fields.user,
          action: actions.ACCEPTED,
          sender: updatedCurrentUser,
          receiver: updatedSenderRequest,
          receivers: [senderId],
          notification,
        },
      });
      await session.commitTransaction();
      session.endSession();
      return {
        sender: updatedCurrentUser,
        receiver: updatedSenderRequest,
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  rejectRequestToAddFriend: async (
    req,
    senderId,
    pubsub,
    rejectRequestToAddFriendSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        receivedRequestToAddFriend: senderId,
      });
      if (!currentUser) {
        throw new UserInputError("Reject failed");
      }
      const sender = await User.findOne({
        _id: senderId,
        sentRequestToAddFriend: currentUserId,
      });
      if (!sender) {
        throw new UserInputError("Reject failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.receivedRequestToAddFriend.pull(senderId);
      await currentUser.save();
      sender.sentRequestToAddFriend.pull(currentUserId);
      await sender.save();
      await session.commitTransaction();
      session.endSession();
      pubsub.publish(rejectRequestToAddFriendSubscription, {
        rejectRequestToAddFriendSubscription: {
          sender: currentUser,
          receiver: sender,
        },
      });
      return {
        sender: currentUser,
        receiver: sender,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Something went wrong.");
    }
  },
  cancelRequestToAddFriend: async (
    req,
    receiverId,
    pubsub,
    cancelRequestToAddFriendSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        sentRequestToAddFriend: receiverId,
      });
      if (!currentUser) {
        throw new UserInputError("Current User not found");
      }
      const receiver = await User.findOne({
        _id: receiverId,
        receivedRequestToAddFriend: currentUserId,
      });
      if (!receiver) {
        throw new UserInputError("receiver not found");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.sentRequestToAddFriend.pull(receiverId);
      currentUser.following.pull(receiverId);
      await currentUser.save();
      receiver.receivedRequestToAddFriend.pull(currentUserId);
      receiver.followed.pull(currentUserId);
      await receiver.save();

      pubsub.publish(cancelRequestToAddFriendSubscription, {
        cancelRequestToAddFriendSubscription: {
          sender: currentUser,
          receiver,
        },
      });
      await session.commitTransaction();
      session.endSession();
      return {
        sender: currentUser,
        receiver,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Cancel Request Failed");
    }
  },
  followUser: async (req, userId) => {
    try {
      const currentUserId = getAuthUser(req);
      const updatedCurrentUser = await User.findByIdAndUpdate(
        currentUserId,
        {
          $addToSet: { following: userId },
        },
        { new: true }
      );
      const updatedFollower = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { followed: currentUserId },
        },
        { new: true }
      );
      return {
        sender: updatedCurrentUser,
        receiver: updatedFollower,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Something went wrong.");
    }
  },
  unFollowUser: async (req, userId) => {
    const currentUserId = getAuthUser(req);
    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $pull: { following: userId },
      },
      { new: true }
    );
    const updatedFollower = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followed: currentUserId },
      },
      { new: true }
    );
    return {
      sender: updatedCurrentUser,
      receiver: updatedFollower,
    };
  },
  removeFriend: async (req, friendId, pubsub, removeFriendSubscription) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        friends: friendId,
      });
      if (!currentUser) {
        throw new AuthenticationError("User not found");
      }
      const friend = await User.findOne({
        _id: friendId,
        friends: currentUserId,
      });
      if (!friend) {
        throw new UserInputError("User not found");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.friends.pull(friendId);
      currentUser.following.pull(friendId);
      currentUser.followed.pull(friendId);
      await currentUser.save();
      friend.friends.pull(currentUserId);
      friend.following.pull(currentUserId);
      friend.followed.pull(currentUserId);
      pubsub.publish(removeFriendSubscription, {
        removeFriendSubscription: {
          sender: currentUser,
          receiver: friend,
        },
      });
      await friend.save();
      await session.commitTransaction();
      session.endSession();
      return {
        sender: currentUser,
        receiver: friend,
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  hidePassword: () => "***",
};
