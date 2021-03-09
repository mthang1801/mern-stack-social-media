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
      const { messengers: privateChatUsersMap } = user;
      const privateChatUsersArray = [];
      console.log(privateChatUsersMap);
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
            options: { name: 1, slug: 1, avatar: 1},
          })
          .populate({
            path: "receiver",
            options: { name: 1, slug: 1, avatar: 1 },
          })
          .sort({ createdAt: -1 })
          .skip(0)
          .limit(+process.env.PRIVATE_CHAT_MESSAGES);
        //sorting by ascending
        const sortedUser = _.sortBy(userMessages, (o) => o.createdAt);
        listPrivateMessages = [...listPrivateMessages, ...sortedUser];
      }
      console.timeEnd("start");
      return {
        privateMessages: listPrivateMessages,
      };
    } catch (error) {
      console.log(error);
      throw new ApolloError("Server error");
    }
  },
  // status received either PRIVATE or GROUP
  sendMessageChatText: async (req, receiverId, text, status) => {
    try {
      const userId = getAuthUser(req);
      if (status === "PRIVATE") {
        const user = await User.findById(userId, {
          name: 1,
          slug: 1,
          avatar: 1,
          messengers : 1
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
          console.log(user.messengers);
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
          console.log("success");
          const _cloneChatText = newPrivateChatText._doc;
          return {
            message: { ..._cloneChatText, sender: user, receiver },
            status: "PRIVATE",
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
};
