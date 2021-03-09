import { privateChatControllers } from "./chat.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const privateChatResolvers = {
  Query: {
    fetchInitialChatMessages: (_, args, { req }, info) =>
      privateChatControllers.fetchInitialChatMessages(
        req,
        args.skip || 0,
        args.limit || +process.env.PRIVATE_CHAT_USERS
      ),
  },
  Mutation: {
    sendMessageChatText: (_, args, { req }, info) =>
      privateChatControllers.sendMessageChatText(
        req,
        args.receiverId,
        args.text,
        args.status,
        pubsub,
        subscriptionActions.SENT_CHAT
      ),
  },
  Subscription: {
    sentMessageChatSubscription: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.SENT_CHAT),
        (payload, {userId}) => {
                    
          const { message } = payload.sentMessageChatSubscription;        
          return message.receiver._id.toString() === userId.toString()
        }
      ),
    },
  },
};
