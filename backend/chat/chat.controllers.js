import getAuthUser from "../utils/getAuthUser";
import { PersonalChat } from "./personal-chat.model";
import { User } from "../user/user.model";
import { ApolloError } from "apollo-server-express";
import _ from "lodash";
import decodeBase64 from "../utils/decodeBase64";
import mongoose from "mongoose";

export const chatControllers = {
  fetchInitialChatMessages: async (req, skip, limit) => {
    //when fetch chat messages, we need update status is delivered message is delivered if it is sent status
    try {
      console.time("start");      
      const currentUserId = getAuthUser(req);
      const user = await User.findById(currentUserId);
      const { messengers: privateChatUsersMap } = user;
      if (privateChatUsersMap && privateChatUsersMap.size) {
        const privateChatUsersArray = [];
        privateChatUsersMap.forEach(function (value, key) {
          privateChatUsersArray.push({ userId: key, latestMsg: value });
        });
        const _sortedPersonalChatUsersArray = _.sortBy(
          privateChatUsersArray,
          function (o) {
            return -o.latestMsg;
          }
        );
        const _getLimitedPersonalChatUsers = _sortedPersonalChatUsersArray
          .slice(skip, limit)
          .map(({ userId }) => userId);
        //find messages between currentUser with limited user
        let listPersonalMessages = [];
        for (let userId of _getLimitedPersonalChatUsers) {
          const userMessages = await PersonalChat.find({
            $or: [
              { sender: userId, receiver: currentUserId },
              { sender: currentUserId, receiver: userId },
            ],
          })
            .populate({
              path: "sender",
              select: { name: 1, slug: 1, avatar: 1 },
            })
            .populate({
              path: "receiver",
              select: { name: 1, slug: 1, avatar: 1 },
            })
            .sort({ createdAt: -1 })
            .skip(0)
            .limit(+process.env.PRIVATE_CHAT_MESSAGES);
          //sorting by ascending
          const sortedUser = _.sortBy([...userMessages], (o) => o.createdAt);
          listPersonalMessages = [...listPersonalMessages, ...sortedUser];
        }
        //loop array, check messageType is IMAGE or FILE and convert data to base64
        const _cloneListPersonalMessages = [...listPersonalMessages].map(
          (message) => {
            const _cloneMessage = message._doc;
            if (
              message.messageType === "IMAGE" ||
              message.messageType === "ATTACHMENT"
            ) {
              return {
                ..._cloneMessage,
                file: {
                  ..._cloneMessage.file,
                  data: `data:${
                    _cloneMessage.file.mimetype
                  };base64,${_cloneMessage.file.data.toString("base64")}`,
                },
              };
            }          
            return { ..._cloneMessage };
          }
        );        
        console.timeEnd("start");
        return {
          privateMessages: _cloneListPersonalMessages,
        };
      }
      return {
        privateMessages: [],
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Server error");
    }
  },
  // scope received either PRIVATE or GROUP
  sendMessageChatText: async (
    req,
    receiverId,
    text,
    scope,
    pubsub,
    sentMessageChatSubscription
  ) => {
    try {
      const userId = getAuthUser(req);
      if (scope === "PRIVATE") {
        const user = await User.findById(userId, {
          name: 1,
          slug: 1,
          avatar: 1,
          messengers: 1,
        });

        if (!user) {
          return {
            error: {
              message: "UnAuthorized",
              statusCode: 400,
            },
          };
        }
        const receiver = await User.findOne(
          {
            _id: receiverId,
            blocks: { $ne: userId },
          },
          { name: 1, slug: 1, avatar: 1, messengers: 1 }
        );
        if (!receiver) {
          return {
            error: {
              message: "You can't send message to this person",
              statusCode: 400,
            },
          };
        }
        if (text) {
          const newPersonalChatText = new PersonalChat({
            sender: userId,
            receiver: receiverId,
            messageType: "TEXT",
            text,
          });
          const session = await mongoose.startSession();
          session.startTransaction();
          if (user.messengers && user.messengers.size) {
            user.messengers.set(receiverId.toString(), Date.now());
          } else {
            user.messengers = new Map([[receiverId.toString(), Date.now()]]);
          }

          await user.save();
          if (receiver.messengers && receiver.messengers.size) {
            receiver.messengers.set(userId.toString(), Date.now());
          } else {
            receiver.messengers = new Map([[userId.toString(), Date.now()]]);
          }
          await receiver.save();
          await newPersonalChatText.save();
          await session.commitTransaction();
          session.endSession();
          const _cloneChatText = newPersonalChatText._doc;
          pubsub.publish(sentMessageChatSubscription, {
            sentMessageChatSubscription: {
              action: "SENT",
              scope,
              message: { ..._cloneChatText, sender: user, receiver },
            },
          });
          return {
            message: { ..._cloneChatText, sender: user, receiver },
            scope,
          };
        }
      }
      return {
        error: {
          message: "Send message fail, there were some errors occured",
          statusCode: 400,
        },
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Server error");
    }
  },
  sendMessageChatFile: async (
    req,
    receiverId,
    file,
    scope,
    messageType,
    pubsub,
    sentMessageChatSubscription
  ) => {
    try {
      const { encoding, filename, mimetype } = file;      
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId, {
        name: 1,
        slug: 1,
        avatar: 1,
        messengers: 1,
      });
      const receiver = await User.findOne(
        {
          _id: receiverId,
          blocks: { $ne: currentUserId },
        },
        { name: 1, slug: 1, avatar: 1, messengers: 1 }
      );
      if (!receiver) {
        return {
          error: {
            message: "User not found",
            statusCode: 400,
          },
        };
      }
      const { data } = decodeBase64(encoding);
      if (scope === "PRIVATE") {
        const session = await mongoose.startSession();
        session.startTransaction();
        const newPersonalMessageFile = new PersonalChat({
          sender: currentUserId,
          receiver: receiverId,
          messageType,
          file: {
            data,
            filename,
            mimetype,
          },
        });
        if (currentUser.messengers && currentUser.messengers.size) {
          currentUser.messengers.set(receiverId.toString(), Date.now());
        } else {
          currentUser.messengers = new Map([
            [receiverId.toString(), Date.now()],
          ]);
        }

        await currentUser.save();
        if (receiver.messengers && receiver.messengers.size) {
          receiver.messengers.set(currentUserId.toString(), Date.now());
        } else {
          receiver.messengers = new Map([
            [currentUserId.toString(), Date.now()],
          ]);
        }
        await receiver.save();
        await newPersonalMessageFile.save();
        await session.commitTransaction();
        session.endSession();
        const _cloneNewPersonalMessageFile = newPersonalMessageFile._doc;
        const messageResult = {
          ..._cloneNewPersonalMessageFile,
          sender: currentUser,
          receiver,
          file: {
            ..._cloneNewPersonalMessageFile.file,
            data: encoding,
          },
        };
        pubsub.publish(sentMessageChatSubscription, {
          sentMessageChatSubscription: {
            action: "SENT",
            message: messageResult,
            scope,
          },
        });
        return {
          message: messageResult,
          scope,
        };
      }
      return {
        error: {
          message: "Send message fail, there were some errors occured",
          statusCode: 400,
        },
      };
    } catch (error) {
      return {
        error: {
          message: "Send message fail, there were some errors occured",
          statusCode: 400,
        },
      };
    }
  },
  updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched: async (
    req,
    listSenderId
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      for (let senderId of listSenderId) {
        await PersonalChat.updateMany(
          { sender: senderId, receiver: currentUserId, receiverStatus: "SENT" },
          { receiverStatus: "DELIVERED" },
          { new: true }
        );
      }
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  updatePersonalReceiverWhenReceivedNewMessage: async (
    req,
    messageId,
    messageStatus,
    pubsub,    
    notifySenderThatReceiverHasReceivedMessageChat
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const updatedMessage = await PersonalChat.findOneAndUpdate(
        { _id: messageId, receiver: currentUserId },
        { receiverStatus: messageStatus },
        { new: true }
      )
        .populate({ path: "sender", select: "name slug avatar" })
        .populate({ path: "receiver", select: "name slug avatar" });

      let _cloneUpdatedMessage = updatedMessage._doc;
      if (updatedMessage.messageType !== "TEXT") {
        _cloneUpdatedMessage.file.data = `data:${
          _cloneUpdatedMessage.file.mimetype
        };base64,${_cloneUpdatedMessage.file.data.toString("base64")}`;
      }

      pubsub.publish(notifySenderThatReceiverHasReceivedMessageChat, {
        notifySenderThatReceiverHasReceivedMessageChat: {
          action: messageStatus,
          scope: "PRIVATE",
          message: _cloneUpdatedMessage,
        },
      });
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  updateHaveSeenAllMessages: async (
    req,
    conversationId,
    scope,
    pubsub,
    senderSubscribeWhenReceiverHasSeenAllMessages
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      if (scope === "PRIVATE") {
        const updatedResult = await PersonalChat.updateMany(
          {
            receiver: currentUserId,
            sender: conversationId,
            receiverStatus: { $ne: "SEEN" },
          },
          { receiverStatus: "SEEN" },
          { new: true }
        );        
        if (updatedResult.nModified) {
          pubsub.publish(senderSubscribeWhenReceiverHasSeenAllMessages, {
            senderSubscribeWhenReceiverHasSeenAllMessages: {
              scope,
              action: "SEEN",
              senderId: conversationId,
              receiverId: currentUserId,
            },
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
};
