import { User } from "./user.model";
import {
  UserInputError,
  AuthenticationError,
  ApolloError,
} from "apollo-server-express";
import { generateToken } from "../utils/token";
import bcrypt from "bcryptjs";
import getAuthUser from "../utils/getAuthUser";
import { fields, contents } from "../notification";
import { Notification } from "../notification/notification.model";
import { POST_STATUS_ENUM, Post } from "../post/post.model";
import mongoose from "mongoose";
import _ from "lodash";
import { raiseError } from "../utils/raiseError";
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
    const userId = getAuthUser(req, false);
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }
    return user;
  },
  fetchPersonalUser: async (req, slug) => {
    const currentUserId = getAuthUser(req, false);
    const currentUser = await User.findById(currentUserId);
    if (currentUser.slug === slug) {
      const countPosts = currentUser.posts.length;
      await currentUser.populate({
        path: "posts",
        populate: [          
          { path: "mentions", select: "name slug avatar" },
          { path: "author", select: "name slug avatar" },
        ],
        options: { skip: 0, limit: +process.env.POSTS_PER_PAGE },
      }).execPopulate();
      const userResult = { ...currentUser._doc, countPosts };  
      console.log(userResult)    
      return userResult;
    }
    const user = await User.findOne({ slug }).populate({
      path: "posts",
      match: {
        $or: [
          { friends: currentUserId, status: POST_STATUS_ENUM.FRIENDS },
          { status: POST_STATUS_ENUM.PUBLIC },
        ],
      },
      populate: [
        { path: "mentions", select: "name slug avatar" },
        { path: "author", select: "name slug avatar" },
      ],
      options: { skip: 0, limit: +process.env.POSTS_PER_PAGE },
    });
    if (!user) {
      const err = new Error("User Not found");
      err.statusCode = 404;
      throw err;
    }
    const countPosts = await Post.countDocuments({
      author: user._id,
      $or: [
        { friends: currentUserId, status: POST_STATUS_ENUM.FRIENDS },
        { status: POST_STATUS_ENUM.PUBLIC },
      ],
    });
    const userResult = { ...user._doc, countPosts };
    return userResult;
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
        options: {
          limit: +process.env.CONTACT_FRIENDS_PER_PAGE,
          sort: { isOnline: 1, name: 1 },
          collation: { locale: "en" },
        },
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
    console.time("fetchFriend");
    const currentUserId = getAuthUser(req, false);
    if (userId) {
      //do something
      return [];
    }
    const friendsList = await User.find(
      { friends: currentUserId },
      { name: 1, slug: 1, avatar: 1, isOnline: 1, offlinedAt: 1 }
    )
      .collation({ locale: "en" })
      .sort({ isOnline: -1, name: 1 })
      .skip(+skip)
      .limit(+limit);
    console.timeEnd("fetchFriend");
    return friendsList;
  },
  sendRequestToAddFriend: async (
    req,
    receiverId,
    pubsub,
    sentRequestToAddFriendSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        friends: { $ne: receiverId },
        sentRequestToAddFriend: { $ne: receiverId },
        receivedRequestToAddFriend: { $ne: receiverId },
      });

      if (!currentUser) {
        await User.findByIdAndUpdate(currentUserId, {
          $pull: {
            friends: receiverId,
            sentRequestToAddFriend: receiverId,
            receivedRequestToAddFriend: receiverId,
          },
        });
        raiseError("Add Friend failed", 400);
      }
      const userRequestedFriend = await User.findOne({
        _id: receiverId,
        friends: { $ne: currentUserId },
        sentRequestToAddFriend: { $ne: currentUserId },
        receivedRequestToAddFriend: { $ne: currentUserId },
      });

      if (!userRequestedFriend) {
        await User.findByIdAndUpdate(receiverId, {
          $pull: {
            friends: currentUserId,
            sentRequestToAddFriend: currentUserId,
            receivedRequestToAddFriend: currentUserId,
          },
        });
        raiseError("Add Friend failed", 400);
      }

      const session = await mongoose.startSession();
      session.startTransaction();
      let notification = await Notification.findOneAndUpdate(
        {
          field: fields.CONTACT,
          content: contents.SENT_REQUEST_TO_ADD_FRIEND,
          "fieldIdentity.sender": currentUserId,
          "fieldIdentity.receiver": receiverId,
        },
        { hasSeen: false, isQuestion : true, "questionType.yesNoQuestion" : true },
        { new: true }
      );
      if (!notification) {
        //create notification to receiver
        notification = new Notification({
          field: fields.CONTACT,
          content: contents.SENT_REQUEST_TO_ADD_FRIEND,
          fieldIdentity: {
            sender: currentUserId,
            receiver: receiverId,
          },
          creator: currentUserId,
          receiver: receiverId,
          url: `/${currentUser.slug}`,
          isQuestion: true,
          questionType: {
            yesNoQuestion: true,
          },
        });
      }

      //update user who sent request to add friend, here is current user
      const updatedSender = await User.findByIdAndUpdate(
        currentUserId,
        {
          $addToSet: {
            sentRequestToAddFriend: receiverId,
            following: receiverId,
          },
        },
        { new: true }
      );
      //update user who receiced request to add friend, here is userId
      const updatedReceiver = await User.findByIdAndUpdate(
        receiverId,
        {
          $addToSet: {
            receivedRequestToAddFriend: currentUserId,
            followed: currentUserId,
            notifications: notification._id,
          },
        },
        { new: true }
      );

      await (await notification.save())
        .populate({ path: "creator", select: "slug name avatar" })
        .populate({ path: "fieldIdentity.sender" })
        .populate({ path: "fieldIdentity.receiver" })
        .execPopulate();
      await pubsub.publish(sentRequestToAddFriendSubscription, {
        sentRequestToAddFriendSubscription: notification._doc,
      });
      await session.commitTransaction();
      session.endSession();
      return {
        sender: updatedSender,
        receiver: updatedReceiver,
      };
    } catch (error) {
      console.log(error);
      raiseError(error.message, 500);
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
        await User.findByIdAndUpdate(currentUserId, {
          $pull: { sentRequestToAddFriend: receiverId },
        });
        raiseError("Cancel request friend failed");
      }
      const receiver = await User.findOne({
        _id: receiverId,
        receivedRequestToAddFriend: currentUserId,
      });
      if (!receiver) {
        await User.findByIdAndUpdate(receiverId, {
          $pull: { sentRequestToAddFriend: currentUserId },
        });
        raiseError("Cancel request friend failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      //remove notification
      const notification = await Notification.findOneAndDelete({
        field: fields.CONTACT,
        content: contents.SENT_REQUEST_TO_ADD_FRIEND,
        "fieldIdentity.sender": currentUserId,
        "fieldIdentity.receiver": receiverId,
      }).populate({ path: "creator", select: "slug name avatar" })

      const updatedSender = await User.findByIdAndUpdate(
        currentUserId,
        {
          $pull: { sentRequestToAddFriend: receiverId, following: receiverId },
        },
        { new: true }
      );

      const updatedReceiver = await User.findByIdAndUpdate(
        receiverId,
        {
          $pull: {
            receivedRequestToAddFriend: currentUserId,
            followed: currentUserId,
            notifications: notification._id,
          },
        },
        { new: true }
      );
      const updatedNotification = {...notification._doc , fieldIdentity : {
        sender : updatedSender, 
        receiver : updatedReceiver
      } }
      if(notification){
        await pubsub.publish(cancelRequestToAddFriendSubscription, {
          cancelRequestToAddFriendSubscription: updatedNotification,
        });
      }      

      await session.commitTransaction();
      session.endSession();
      return {
        sender: updatedSender,
        receiver: updatedReceiver,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Cancel Request Failed");
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
        raiseError("Reject failed");
      }
      const sender = await User.findOne({
        _id: senderId,
        sentRequestToAddFriend: currentUserId,
      });
      if (!sender) {
        raiseError("Reject request failed");
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.receivedRequestToAddFriend.pull(senderId);
      await currentUser.save();
      sender.sentRequestToAddFriend.pull(currentUserId);
      await sender.save();
      //update notification
      const notification = await Notification.findOneAndDelete({
        field : fields.CONTACT,
        content: contents.SENT_REQUEST_TO_ADD_FRIEND,
        "fieldIdentity.sender" : senderId, 
        "fieldIdentity.receiver" : currentUserId
      });
      await session.commitTransaction();      
      session.endSession();
     
      await pubsub.publish(rejectRequestToAddFriendSubscription, {
        rejectRequestToAddFriendSubscription: {
          sender: sender,
          receiver: currentUser,          
        },
      });
      
      return {
        sender: sender,
        receiver: currentUser,
        notification 
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Something went wrong.");
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
  searchFriends: async (req, search) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId).populate({
        path: "friends",
        match: { name: new RegExp(search, "gi") },
        select: "name avatar slug",
      });
      return currentUser.friends;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  hidePassword: () => "***",
};
