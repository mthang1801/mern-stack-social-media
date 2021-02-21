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
    const user = await User.findOne({ email });

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
    const userId = getAuthUser(req);

    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: { path: "creator" },
    });
    if (!user) {
      throw new AuthenticationError("User not found");
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
  sendRequestToAddFriend: async (
    req,
    userId,
    pubsub,
    notifyReceiveAddFriend
  ) => {
    try {
      const currentUserId = getAuthUser(req);      
      const currentUser = await User.findOne({
        _id: currentUserId,
        friends: { $ne: userId },
        sendRequestToAddFriend: { $ne: userId },
        receiveRequestToAddFriend: { $ne: userId },
      });

      if (!currentUser) {
        throw new UserInputError("Add friend failed");
      }
      const userRequestedFriend = await User.findOne({
        _id: userId,
        friends: { $ne: currentUserId },
        sendRequestToAddFriend: { $ne: userId },
        receiveRequestToAddFriend: { $ne: userId },
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
      if (!userRequestedFriend.followed.includes(mongoose.Types.ObjectId(currentUserId))) {
        userRequestedFriend.followed.push(currentUserId);
      }
      userRequestedFriend.receiveRequestToAddFriend.push(currentUserId);
      userRequestedFriend.notifications.push(notification._id);
      await userRequestedFriend.save();

      if (!currentUser.following.includes(mongoose.Types.ObjectId(userId))) {
        currentUser.following.push(userId);
      }
      currentUser.sendRequestToAddFriend.push(userId);
      await currentUser.save();
      pubsub.publish(notifyReceiveAddFriend, {
        notifyReceiveAddFriend: {
          field: fields.user,
          action: actions.ADDED,
          receivers: [userId],
          notification,
        },
      });
      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      throw new ApolloError("Add friend failed.");
    }
  },
  rejectRequestToAddFriend: async (req, userId, pubsub, rejectRequestToAddFriendSubscription) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        receiveRequestToAddFriend: userId,
      });    
      if (!currentUser) {
        throw new UserInputError("Reject failed");
      }
      const user = await User.findOne({
        _id: userId,
        sendRequestToAddFriend: currentUserId,
      });
      if (!user) {
        throw new UserInputError("Reject failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.receiveRequestToAddFriend.pull(userId);
      await currentUser.save();
      user.sendRequestToAddFriend.pull(currentUserId);
      await user.save();          
      await session.commitTransaction();
      session.endSession();
      pubsub.publish(rejectRequestToAddFriendSubscription, {
        rejectRequestToAddFriendSubscription: {
          sender : user,
          receiver : currentUser
        },
      });
      return true;
    } catch (error) {
      console.log(error)
      throw new ApolloError("Something went wrong.");
    }
  },
  hidePassword: () => "***",
};
