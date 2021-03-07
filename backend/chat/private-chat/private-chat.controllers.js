import getAuthUser from "../../utils/getAuthUser";
import { PrivateChat } from "./private-chat.model";
import { User } from "../../user/user.model";
import { CheckResultAndHandleErrors, ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
export const privateChatControllers = {
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
