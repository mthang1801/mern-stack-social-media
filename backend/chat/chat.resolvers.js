const { chatControllers } = require('./chat.controllers');
const { publish } = require('../pubsub');
const { withFilter } = require('apollo-server-express');
const { subscriptionActions } = require('../schema/schema.subscription');
const constant = require('../config/constant');
exports.chatResolvers = {
  Query: {
    fetchChatConversations: (_, args, { req }, info) =>
      chatControllers.fetchChatConversations(
        req,
        args.except || [],
        args.skip || 0,
        args.limit || constant.NUMBER_CONVERSATIONS_LIMITATION
      ),

    fetchMessages: (_, args, { req }, info) =>
      chatControllers.fetchMessages(
        req,
        args.conversationId,
        args.scope,
        args.skip,
        args.limit
      ),
    fetchSingleChatConversation: (_, args, { req }, info) =>
      chatControllers.fetchSingleChatConversation(
        req,
        args.conversationId,
        args.scope
      ),
  },
  Mutation: {
    sendMessageChatText: (_, args, { req }, info) =>
      chatControllers.sendMessageChatText(
        req,
        args.receiverId,
        args.text,
        args.scope,
        pubsub,
        subscriptionActions.SENT_CHAT
      ),
    sendMessageChatFile: (_, args, { req }, info) =>
      chatControllers.sendMessageChatFile(
        req,
        args.receiverId,
        args.file,
        args.scope,
        args.messageType,
        pubsub,
        subscriptionActions.SENT_CHAT
      ),
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched: (
      _,
      args,
      { req },
      info
    ) =>
      chatControllers.updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched(
        req,
        args.listSenderId,
        pubsub,
        subscriptionActions.UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE
      ),
    updatePersonalReceiverWhenReceivedNewMessage: (_, args, { req }, info) =>
      chatControllers.updatePersonalReceiverWhenReceivedNewMessage(
        req,
        args.messageId,
        args.messageStatus,
        pubsub,
        subscriptionActions.UPDATE_RECEIVER_RECEIVED_CHAT
      ),
    updateHaveSeenAllMessages: (_, args, { req }, info) =>
      chatControllers.updateHaveSeenAllMessages(
        req,
        args.conversationId,
        args.scope,
        pubsub,
        subscriptionActions.UPDATE_RECEIVER_SEEN_ALL_MESSAGES
      ),
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
          const { message } =
            payload.notifySenderThatReceiverHasReceivedMessageChat;
          return message.sender._id.toString() === userId.toString();
        }
      ),
    },
    senderSubscribeWhenReceiverHasSeenAllMessages: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.UPDATE_RECEIVER_SEEN_ALL_MESSAGES
          ),
        (payload, { userId }) => {
          const { senderId } =
            payload.senderSubscribeWhenReceiverHasSeenAllMessages;
          return senderId.toString() === userId.toString();
        }
      ),
    },
    notifySendersThatReceiverOnlineHasReceivedMessagesChat: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE
          ),
        (payload, { userId }) => {
          console.log(payload);
          return payload.notifySendersThatReceiverOnlineHasReceivedMessagesChat.senders.includes(
            userId.toString()
          );
        }
      ),
    },
  },
};
