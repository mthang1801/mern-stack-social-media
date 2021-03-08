import getAuthUser from "../../utils/getAuthUser";
import { PrivateChat } from "./private-chat.model";
import { User } from "../../user/user.model";
import { CheckResultAndHandleErrors, ApolloError } from "apollo-server-express";
import _ from "lodash";
import mongoose from "mongoose";
export const privateChatControllers = {
  fetchInitialChatMessages: async (req, skip, limit) => {
    try {
      console.time("start");
      const currentUserId = getAuthUser(req);
      const user = await User.findById(currentUserId);
      const { privateChatUsers: privateChatUsersMap } = user;
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
            options: { name: 1, slug: 1, avatar: 1 },
          })
          .populate({
            path: "receiver",
            options: { name: 1, slug: 1, avatar: 1 },
          })
          .sort({ createdAt: -1 })
          .skip(0)
          .limit(+process.env.PRIVATE_CHAT_MESSAGES);
          //sorting by ascending
        const sortedUser = _.sortBy(userMessages, o=> o.createdAt)
        listPrivateMessages = [...listPrivateMessages, ...sortedUser];
      }
      console.timeEnd("start")      
      return {
        privateMessages: listPrivateMessages,      
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Server error");
    }
  },
  sendPrivateMessageChatText: async (req, receiverId, text) => {
    try {
      const userId = getAuthUser(req);
      const user = await User.findById(userId);

      if (!user) {
        return {
          error: {
            message: "UnAuthorized",
            statusCode: 400,
          },
        };
      }
      const receiver = await User.findOne({
        _id: receiverId,
        blocks: { $ne: userId },
      });
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
        user.privateChatUsers
          ? user.privateChatUsers.set(receiverId.toString(), Date.now())
          : (user.privateChatUsers = new Map([
              [receiverId.toString(), Date.now()],
            ]));

        await user.save();
        receiver.privateChatUsers
          ? receiver.privateChatUsers.set(userId.toString(), Date.now())
          : (receiver.privateChatUsers = new Map([
              [userId.toString(), Date.now()],
            ]));
        await receiver.save();
        await newPrivateChatText.save();
        await session.commitTransaction();
        session.endSession();
        console.log("success");
        return {
          message: newPrivateChatText,
        };
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
};
