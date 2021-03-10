import { chatControllers } from "./chat.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const chatResolvers = {
  Query: {
    fetchInitialChatMessages: (_, args, { req }, info) =>
      chatControllers.fetchInitialChatMessages(
        req,
        args.skip || 0,
        args.limit || +process.env.PRIVATE_CHAT_USERS
      ),
  },
  Mutation: {
    sendMessageChatText: (_, args, { req }, info) =>
      chatControllers.sendMessageChatText(
        req,
        args.receiverId,
        args.text,
        args.status,
        pubsub,
        subscriptionActions.SENT_CHAT
      ),
    sendMessageChatFile: (_, args, { req }, info) =>
      chatControllers.sendMessageChatFile(
        req,
        args.receiverId,
        args.file,
        args.status,
        args.messageType,
        pubsub,
        subscriptionActions.SENT_CHAT
      ),
    updatePrivateReceiverStatusSentToDeliveredWhenReceiverFetched: (
      _,
      args,
      { req },
      info
    ) =>
      chatControllers.updatePrivateReceiverStatusSentToDeliveredWhenReceiverFetched(
        req,
        args.listSenderId
      ),
    updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage: (
      _,
      args,
      { req },
      info
    ) => {
      chatControllers.updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage(
        req,
        args.messageId,
        pubsub,
        subscriptionActions.UPDATE_RECEIVER_RECEIVED_CHAT
      );
    },
  },
  Subscription: {
    sentMessageChatSubscription: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.SENT_CHAT),
        (payload, { userId }) => {
          const { message } = payload.sentMessageChatSubscription;
          return message.receiver._id.toString() === userId.toString();
        }
      ),
    },
    notifySenderThatReceiverHasReceivedMessageChat: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.UPDATE_RECEIVER_RECEIVED_CHAT
          ),
        (payload, { userId }) => {
          const {
            message,
          } = payload.notifySenderThatReceiverHasReceivedMessageChat;
          return message.sender._id.toString() === userId.toString();
        }
      ),
    },
  },
};
