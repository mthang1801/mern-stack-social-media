import { User } from './user.model';
import {
  UserInputError,
  AuthenticationError,
  ApolloError,
} from 'apollo-server-express';
import { generateToken } from '../utils/token';
import bcrypt from 'bcryptjs';
import getAuthUser from '../utils/getAuthUser';
import { fields, contents } from '../notification';
import { Notification } from '../notification/notification.model';
import constant from '../config/constant';
import mongoose from 'mongoose';
import _ from 'lodash';
import { raiseError } from '../utils/raiseError';
import pattern from '../config/pattern';
export const userController = {
  users: () => User.find(),
  createUser: async (data) => {
    const { name, email, password } = data;
    if (!name) {
      throw new UserInputError('Name is requried');
    }
    const lowerName = name.toLowerCase();
    const emailRegex = pattern.email;
    if (!emailRegex.test(email)) {
      throw new UserInputError('Email is invalid');
    }
    const pwdPattern = pattern.password;
    if (!pwdPattern.test(password)) {
      throw new UserInputError('Password is too short');
    }
    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      throw new UserInputError('Email has been existing');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let slug = pattern
      .removeVietnameseTones(lowerName)
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-');
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
      throw new UserInputError('email or password was not correct');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UserInputError('email or password was not correct');
    }
    return {
      user,
      token: generateToken(user._id),
      tokenExpire: process.env.JWT_TOKEN_EXPIRE,
    };
  },
  loginUserWithGoogle: async (data) => {
    const { email, googleId, name, imageUrl } = data;
    let user = await User.findOne({ email });
    if (user && !user.google.uid) {
      user.google.uid = googleId;
      if (user.avatar === '/images/avatar-default.png') {
        user.avatar = imageUrl;
      }
    } else if (!user) {
      let slug = pattern
        .removeVietnameseTones(name.toLowerCase())
        .replace(/[^a-z0-9]/gi, '-')
        .replace(/-+/g, '-');
      const checkSlugExisting = await User.findOne({ slug });
      if (checkSlugExisting) {
        slug = `${slug}_${Date.now().toString(36)}`;
      }
      user = new User({
        name,
        email,
        avatar: imageUrl,
        slug,
        google: {
          uid: googleId,
        },
      });
    }
    await user.save();

    return {
      user,
      token: generateToken(user._id),
      tokenExpire: process.env.JWT_TOKEN_EXPIRE,
    };
  },
  fetchCurrentUser: async (req) => {
    console.time('fetch Current User');
    const userId = getAuthUser(req, false);
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }
    console.timeEnd('fetch Current User');
    return user;
  },
  fetchPersonalUser: async (req, slug) => {
    try {
      const userBySlug = await User.findOne({ slug }, { password: 0 });
      return userBySlug;
    } catch (error) {
      console.log(error);
      raiseError(error.message);
    }
  },
  fetchListContact: async (req) => {
    const currentUserId = getAuthUser(req);
    const currentUser = await User.findById(currentUserId)
      .populate({
        path: 'friends',
        options: {
          collation: { locale: 'en' },
          sort: { isOnline: -1, slug: 1 },
          skip: 0,
          limit: constant.CONTACT_USERS_PER_PAGE,
        },
      })
      .populate({
        path: 'sentRequestToAddFriend',
        options: {
          sort: { createdAt: -1 },
          limit: constant.CONTACT_USERS_PER_PAGE,
        },
      })
      .populate({
        path: 'receivedRequestToAddFriend',
        options: {
          sort: { createdAt: -1 },
          limit: constant.CONTACT_USERS_PER_PAGE,
        },
      });
    if (!currentUser) {
      throw new AuthenticationError('User not found');
    }

    return {
      sentRequests: currentUser.sentRequestToAddFriend,
      receivedRequests: currentUser.receivedRequestToAddFriend,
      friends: currentUser.friends,
    };
  },
  fetchFriends: async (req, skip, limit, except, userId) => {
    console.time('fetchFriend');
    const currentUserId = getAuthUser(req, false);
    if (userId) {
      //do something
      return [];
    }
    const friendsList = await User.find(
      { _id: { $nin: except }, friends: currentUserId },
      { name: 1, slug: 1, avatar: 1, isOnline: 1, offlinedAt: 1, email: 1 }
    )
      .collation({ locale: 'en' })
      .sort({ isOnline: -1, slug: 1 })
      .skip(skip)
      .limit(limit);
    console.timeEnd('fetchFriend');
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
        await User.findByIdAndUpdate(receiverId, {
          $pull: {
            friends: currentUserId,
            sentRequestToAddFriend: currentUserId,
            receivedRequestToAddFriend: currentUserId,
          },
        });
        await User.findByIdAndUpdate(currentUserId, {
          $pull: {
            friends: receiverId,
            sentRequestToAddFriend: receiverId,
            receivedRequestToAddFriend: receiverId,
          },
        });
        raiseError('Add Friend failed', 400);
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
        await User.findByIdAndUpdate(currentUserId, {
          $pull: {
            friends: receiverId,
            sentRequestToAddFriend: receiverId,
            receivedRequestToAddFriend: receiverId,
          },
        });
        raiseError('Add Friend failed', 400);
      }

      const session = await mongoose.startSession();
      session.startTransaction();
      let notification = await Notification.findOneAndUpdate(
        {
          field: fields.CONTACT,
          content: contents.SENT_REQUEST_TO_ADD_FRIEND,
          'fieldIdentity.sender': currentUserId,
          'fieldIdentity.receiver': receiverId,
        },
        {
          hasSeen: false,
          isQuestion: true,
          'questionType.yesNoQuestion': true,
        },
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
        .populate({ path: 'creator', select: 'slug name avatar' })
        .populate({ path: 'fieldIdentity.sender' })
        .populate({ path: 'fieldIdentity.receiver' })
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
        raiseError('Cancel request friend failed');
      }
      const receiver = await User.findOne({
        _id: receiverId,
        receivedRequestToAddFriend: currentUserId,
      });
      if (!receiver) {
        await User.findByIdAndUpdate(receiverId, {
          $pull: { sentRequestToAddFriend: currentUserId },
        });
        raiseError('Cancel request friend failed');
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      //remove notification
      const notification = await Notification.findOne({
        field: fields.CONTACT,
        content: contents.SENT_REQUEST_TO_ADD_FRIEND,
        'fieldIdentity.sender': currentUserId,
        'fieldIdentity.receiver': receiverId,
      });

      const updatedSender = await User.findByIdAndUpdate(
        currentUserId,
        {
          $pull: { sentRequestToAddFriend: receiverId, following: receiverId },
        },
        { new: true }
      );

      const sentRequestNotification = await Notification.findOne({
        field: fields.CONTACT,
        content: contents.SENT_REQUEST_TO_ADD_FRIEND,
        'fieldIdentity.sender': currentUserId,
        'fieldIdentity.receiver': receiverId,
      });

      const updatedReceiver = await User.findByIdAndUpdate(
        receiverId,
        {
          $pull: {
            receivedRequestToAddFriend: currentUserId,
            followed: currentUserId,
            notifications: sentRequestNotification?._id,
          },
        },
        { new: true }
      );
      const removedSentRequestNotification =
        await Notification.findOneAndDelete({
          field: fields.CONTACT,
          content: contents.SENT_REQUEST_TO_ADD_FRIEND,
          'fieldIdentity.sender': currentUserId,
          'fieldIdentity.receiver': receiverId,
        })
          .populate({ path: 'creator', select: 'slug name avatar' })
          .populate({ path: 'fieldIdentity.sender' })
          .populate({ path: 'fieldIdentity.receiver' });

      if (removedSentRequestNotification) {
        await pubsub.publish(cancelRequestToAddFriendSubscription, {
          cancelRequestToAddFriendSubscription:
            removedSentRequestNotification._doc,
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
      throw new ApolloError('Cancel Request Failed');
    }
  },
  fetchSentRequestToAddFriend: async (req, skip, limit) => {
    const currentUserId = await getAuthUser(req);
    const currentUser = await User.findById(currentUserId).populate({
      path: 'sentRequestToAddFriend',
      options: { sort: { createdAt: -1 }, skip: +skip, limit: +limit },
    });
    return currentUser.sentRequestToAddFriend;
  },
  fetchReceivedRequestToAddFriend: async (req, skip, limit) => {
    const currentUserId = await getAuthUser(req);

    const currentUser = await User.findById(currentUserId).populate({
      path: 'receivedRequestToAddFriend',
      options: { sort: { createdAt: -1 }, skip: +skip, limit: +limit },
    });
    return currentUser.receivedRequestToAddFriend;
  },
  acceptRequestToAddFriend: async (
    req,
    senderId,
    pubsub,
    acceptRequestToAddFriendSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findOne({
        _id: currentUserId,
        receivedRequestToAddFriend: senderId,
      });
      if (!currentUser) {
        await User.findOneAndUpdate(
          { _id: senderId, sentRequestToAddFriend: currentUserId },
          { $pull: { sentRequestToAddFriend: currentUserId } }
        );
        throw new UserInputError('Accept request failed');
      }
      const sender = await User.findOne({
        _id: senderId,
        sentRequestToAddFriend: currentUserId,
      });
      if (!sender) {
        await User.findOneAndUpdate(
          { _id: currentUserId, receivedRequestToAddFriend: senderId },
          { $pull: { receivedRequestToAddFriend: senderId } }
        );
        throw new UserInputError('Accept request failed');
      }
      const session = await mongoose.startSession();
      session.startTransaction();

      const removedNotificationRequestToAddFriend =
        await Notification.findOneAndDelete({
          field: fields.CONTACT,
          content: contents.SENT_REQUEST_TO_ADD_FRIEND,
          'fieldIdentity.sender': senderId,
          'fieldIdentity.receiver': currentUserId,
        })
          .populate({ path: 'creator', select: 'slug name avatar' })
          .populate({ path: 'fieldIdentity.sender' })
          .populate({ path: 'fieldIdentity.receiver' });

      const updatedCurrentUser = await User.findByIdAndUpdate(
        currentUserId,
        {
          $pull: {
            receivedRequestToAddFriend: senderId,
            notifications: removedNotificationRequestToAddFriend?._id,
          },
          $addToSet: {
            friends: senderId,
            following: senderId,
            followed: senderId,
          },
        },
        { new: true }
      );

      let notificationForSender = await Notification.findOneAndUpdate(
        {
          field: fields.CONTACT,
          content: contents.ACCEPT_REQUEST_TO_ADD_FRIEND,
          'fieldIdentity.sender': currentUserId,
          'fieldIdentity.receiver': senderId,
        },
        { hasSeen: false },
        { new: true }
      );
      if (!notificationForSender) {
        notificationForSender = new Notification({
          field: fields.CONTACT,
          content: contents.ACCEPT_REQUEST_TO_ADD_FRIEND,
          fieldIdentity: {
            sender: currentUserId,
            receiver: senderId,
          },
          url: `/${currentUser.slug}`,
          creator: currentUserId,
          receiver: senderId,
        });
      }

      const updatedSenderRequest = await User.findByIdAndUpdate(
        senderId,
        {
          $pull: { sentRequestToAddFriend: currentUserId },
          $addToSet: {
            friends: currentUserId,
            following: currentUserId,
            followed: currentUserId,
            notifications: notificationForSender._id,
          },
        },
        { new: true }
      );
      await (await notificationForSender.save())
        .populate({ path: 'creator', select: 'name slug avatar' })
        .populate({ path: 'fieldIdentity.sender' })
        .populate({ path: 'fieldIdentity.receiver' })
        .execPopulate();

      await pubsub.publish(acceptRequestToAddFriendSubscription, {
        acceptRequestToAddFriendSubscription: notificationForSender._doc,
      });
      await session.commitTransaction();
      session.endSession();
      const result = {
        sender: updatedSenderRequest,
        receiver: updatedCurrentUser,
      };
      if (removedNotificationRequestToAddFriend) {
        result.notification = removedNotificationRequestToAddFriend;
      }
      return result;
    } catch (error) {
      console.log(error);
      raiseError(error.message);
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
        await User.findByIdAndUpdate(
          { _id: senderId, sentRequestToAddFriend: currentUserId },
          {
            $pull: {
              receivedRequestToAddFriend: currentUserId,
              friends: currentUserId,
              sentRequestToAddFriend: currentUserId,
            },
          }
        );
        await User.findByIdAndUpdate(
          { _id: currentUserId, sentRequestToAddFriend: senderId },
          {
            $pull: {
              receivedRequestToAddFriend: senderId,
              friends: senderId,
              sentRequestToAddFriend: senderId,
            },
          }
        );
        raiseError('Reject failed');
      }
      const sender = await User.findOne({
        _id: senderId,
        sentRequestToAddFriend: currentUserId,
      });
      if (!sender) {
        await User.findByIdAndUpdate(
          { _id: senderId, sentRequestToAddFriend: currentUserId },
          {
            $pull: {
              receivedRequestToAddFriend: currentUserId,
              friends: currentUserId,
              sentRequestToAddFriend: currentUserId,
            },
          }
        );
        await User.findByIdAndUpdate(
          { _id: currentUserId, sentRequestToAddFriend: senderId },
          {
            $pull: {
              receivedRequestToAddFriend: senderId,
              friends: senderId,
              sentRequestToAddFriend: senderId,
            },
          }
        );
        raiseError('Reject request failed');
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.receivedRequestToAddFriend.pull(senderId);

      sender.sentRequestToAddFriend.pull(currentUserId);
      await sender.save();
      //update notification
      const removedNotification = await Notification.findOneAndDelete({
        field: fields.CONTACT,
        content: contents.SENT_REQUEST_TO_ADD_FRIEND,
        'fieldIdentity.sender': senderId,
        'fieldIdentity.receiver': currentUserId,
      })
        .populate({ path: 'creator', select: 'name slug avatar' })
        .populate({ path: 'fieldIdentity.sender' })
        .populate({ path: 'fieldIdentity.receiver' });

      if (removedNotification) {
        currentUser.notifications.pull(removedNotification._id);
      }

      await currentUser.save();
      await session.commitTransaction();
      session.endSession();

      await pubsub.publish(rejectRequestToAddFriendSubscription, {
        rejectRequestToAddFriendSubscription: {
          sender: sender,
          receiver: currentUser,
          notification: removedNotification,
        },
      });

      return {
        sender: sender,
        receiver: currentUser,
        notification: removedNotification,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError('Something went wrong.');
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
      throw new ApolloError('Something went wrong.');
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
        throw new AuthenticationError('User not found');
      }
      const friend = await User.findOne({
        _id: friendId,
        friends: currentUserId,
      });
      if (!friend) {
        throw new UserInputError('User not found');
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      currentUser.friends.pull(friendId);
      currentUser.following.pull(friendId);
      currentUser.followed.pull(friendId);

      friend.friends.pull(currentUserId);
      friend.following.pull(currentUserId);
      friend.followed.pull(currentUserId);

      //remove accept notification
      const notification = await Notification.findOneAndDelete({
        field: fields.CONTACT,
        content: contents.ACCEPT_REQUEST_TO_ADD_FRIEND,
        $or: [
          {
            'fieldIdentity.sender': currentUserId,
            'fieldIdentity.receiver': friendId,
          },
          {
            'fieldIdentity.sender': friendId,
            'fieldIdentity.receiver': currentUserId,
          },
        ],
      });

      if (
        notification &&
        friend.notifications.includes(notification._id.toString())
      ) {
        friend.notifications.pull(notification._id);
      }

      if (
        notification &&
        currentUser.notifications.includes(notification._id.toString())
      ) {
        currentUser.notifications.pull(notification._id);
      }

      await currentUser.save();
      await friend.save();

      const returnResult = {
        sender: currentUser,
        receiver: friend,
      };
      if (notification) {
        returnResult.notification = notification;
      }
      await pubsub.publish(removeFriendSubscription, {
        removeFriendSubscription: returnResult,
      });
      await session.commitTransaction();
      session.endSession();
      return returnResult;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error.message);
    }
  },
  searchFriends: async (req, search) => {
    try {
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId).populate({
        path: 'friends',
        match: { name: new RegExp(search, 'gi') },
        select: 'name avatar slug',
      });
      return currentUser.friends;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  hidePassword: () => '***',
};
