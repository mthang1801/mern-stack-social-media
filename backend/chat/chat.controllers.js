import getAuthUser from "../utils/getAuthUser";
import { PrivateChat } from "./private-chat.model";
import { User } from "../user/user.model";
import { CheckResultAndHandleErrors, ApolloError } from "apollo-server-express";
import _ from "lodash";
import decodeBase64 from "../utils/decodeBase64";
import mongoose from "mongoose";
import bufferToBase64 from "../utils/bufferToBase64"
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
        const _sortedPrivateChatUsersArray = _.sortBy(
          privateChatUsersArray,
          function (o) {
            return -o.latestMsg;
          }
        );
        const _getLimitedPrivateChatUsers = _sortedPrivateChatUsersArray
          .slice(skip, limit)
          .map(({ userId }) => userId);
        //find messages between currentUser with limited user
        let listPrivateMessages = [];
        for (let userId of _getLimitedPrivateChatUsers) {
          const userMessages = await PrivateChat.find({
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
          listPrivateMessages = [...listPrivateMessages, ...sortedUser];
        }
        //loop array, check messageType is IMAGE or FILE and convert data to base64
        const _cloneListPrivateMessages = [...listPrivateMessages].map((message) => {
          const _cloneMessage= message._doc;
          if (
            message.messageType === "IMAGE" ||
            message.messageType === "FILE"
          ) {
            return {
              ..._cloneMessage,
              file : {..._cloneMessage.file, data : `data:${_cloneMessage.file.mimetype};base64,${_cloneMessage.file.data.toString("base64")}`}
            }
          }
          return {..._cloneMessage}; 
        });
        console.timeEnd("start")       ;
        return {
          privateMessages: _cloneListPrivateMessages,
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
  // status received either PRIVATE or GROUP
  sendMessageChatText: async (
    req,
    receiverId,
    text,
    status,
    pubsub,
    sentMessageChatSubscription
  ) => {
    try {
      const userId = getAuthUser(req);
      if (status === "PRIVATE") {
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
          const newPrivateChatText = new PrivateChat({
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
          await newPrivateChatText.save();
          await session.commitTransaction();
          session.endSession();
          const _cloneChatText = newPrivateChatText._doc;
          pubsub.publish(sentMessageChatSubscription, {
            sentMessageChatSubscription: {
              action: "SENT",
              status,
              message: { ..._cloneChatText, sender: user, receiver },
            },
          });
          return {
            message: { ..._cloneChatText, sender: user, receiver },
            status,
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
  sendMessageChatFile: async (req, receiverId, file, status, messageType, pubsub, sentMessageChatSubscription) => {
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
      if (status === "PRIVATE") {
        const session = await mongoose.startSession();
        session.startTransaction();
        const newPrivateMessageFile = new PrivateChat({
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
        await newPrivateMessageFile.save();
        await session.commitTransaction();
        session.endSession();
        const _cloneNewPrivateMessageFile = newPrivateMessageFile._doc;
        const messageResult = {
          ..._cloneNewPrivateMessageFile,
          sender: currentUser,
          receiver,
          file: {
            ..._cloneNewPrivateMessageFile.file,
            data: encoding,
          },
        }
        pubsub.publish(sentMessageChatSubscription, {
          sentMessageChatSubscription : {
            action : "SENT",
            message : messageResult,
            status
          }
        })
        return {
          message: messageResult ,
          status,
        };
      }
      return {
        error: {
          message: "Send message fail, there were some errors occured",
          statusCode: 400,
        },
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  updatePrivateReceiverStatusSentToDeliveredWhenReceiverFetched: async (
    req,
    listSenderId
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      for (let senderId of listSenderId) {
        await PrivateChat.updateMany(
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
  updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage: async (
    req,
    messageId,
    pubsub,
    notifySenderThatReceiverHasReceivedMessageChat
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const updatedMessage = await PrivateChat.findOneAndUpdate(
        { _id: messageId, receiver: currentUserId, receiverStatus: "SENT" },
        { receiverStatus: "DELIVERED" },
        { new: true }
      )
        .populate({ path: "sender", select: "name slug avatar" })
        .populate({ path: "receiver", select: "name slug avatar" });
      const _cloneUpdatedMessage = updatedMessage._doc;
      _cloneUpdatedMessage.file.data =  `data:${_cloneUpdatedMessage.file.mimetype};base64,${_cloneUpdatedMessage.file.data.toString("base64")}`;
      console.log(_cloneUpdatedMessage)
      pubsub.publish(notifySenderThatReceiverHasReceivedMessageChat, {
        notifySenderThatReceiverHasReceivedMessageChat: {
          action: "DELIVERED",
          status: "PRIVATE",
          message: updatedMessage,
        },
      });
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
};
