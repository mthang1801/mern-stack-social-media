import { privateChatControllers } from "./private-chat.controllers";
import { pubsub } from "../../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../../schema";
export const privateChatResolvers = {
  Query: {
    fetchPrivateChatMessages: (_, args, { req }, info) =>
      privateChatControllers.fetchPrivateChatMessages(
        req,
        args.skip || 0,
        args.limit || +process.env.PRIVATE_CHAT_USERS
      ),
  },
  Mutation: {
    sendPrivateMessageChatText: (_, args, { req }, info) =>
      privateChatControllers.sendPrivateMessageChatText(
        req,
        args.receiverId,
        args.text
      ),
  },
  Subscription: {
    privateChatActions: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.PRIVATE_CHAT_ACTIONS),
        (payload, userId) => {
          const { action, node } = payload.privateChatActions;
          console.log(payload);
          return true;
        }
      ),
    },
  },
};
