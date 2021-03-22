import { SENT_MESSAGE_CHAT_SUBSCRIPTION } from "./sentMessageChatSubscription";
import { NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT } from "./notifySenderThatReceiverHasReceivedMessageChat";
import { SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES } from "./senderSubscribeWhenReceiverHasSeenAllMessages";
import { NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES } from "./notifySendersThatReceiverOnlineHasReceivedMessagesChat";
const chatSubscription = {
  SENT_MESSAGE_CHAT_SUBSCRIPTION,
  NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT,
  SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES,
  NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES,
};

export default chatSubscription;
