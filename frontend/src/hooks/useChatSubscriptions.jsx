import { useEffect } from "react";
import {
  FETCH_CHAT_CONVERSATIONS,
  UPDATE_PERSONAL_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE,
} from "../apollo/chat/chat.types";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { userVar, currentChatVar } from "../apollo/cache";
import {
  setMessagesStorage,
  updateMessagesStorage,
  updateMessagesStorageWhenReceiverSeenAllMessages,
  updateMessagesStorageToReceivedWhenUserOnline,
} from "../apollo/chat/chat.caches";
import {
  SENT_MESSAGE_CHAT_SUBSCRIPTION,
  NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT,
  SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES,
  NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES,
} from "../apollo/chat/chat.types";

const useChatSubscriptions = () => {
  const user = useReactiveVar(userVar);
  const currentChat = useReactiveVar(currentChatVar)
  const { subscribeToMore: subscribeChatMessage } = useQuery(
    FETCH_CHAT_CONVERSATIONS,
    {
      skip: true,
      fetchPolicy: "cache-and-network",
    }
  );  

  const [updatePersonalReceiverWhenReceivedNewMessage] = useMutation(
    UPDATE_PERSONAL_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE
  );
  useEffect(() => {
    let unsubscribeChatMessage;
    let unsubscribeNotifySenderThatReceiverHasReceivedMessage;
    let unsubscribeSubscribeReceiverHasSeenAllMessages;
    let unsubscribeNotifySendersReceiverOnlineHasReceivedMessages;
    if (subscribeChatMessage && user) {
      unsubscribeChatMessage = subscribeChatMessage({
        document: SENT_MESSAGE_CHAT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            action,
            scope,
            message,
          } = subscriptionData.data.sentMessageChatSubscription;
          const { sender } = message;

          setMessagesStorage(sender, message, scope, false);
          //update Delivered status
          const messageStatus =
            currentChat?._id === sender._id ? "SEEN" : "DELIVERED";
          updatePersonalReceiverWhenReceivedNewMessage({
            variables: { messageId: message._id, messageStatus },
          });
        },
      });
      unsubscribeNotifySenderThatReceiverHasReceivedMessage = subscribeChatMessage(
        {
          document: NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT,
          variables: { userId: user._id },
          updateQuery: (_, { subscriptionData }) => {
            const {
              action,
              scope,
              message,
            } = subscriptionData.data.notifySenderThatReceiverHasReceivedMessageChat;
            const { receiver } = message;
            updateMessagesStorage(receiver, message, scope, action === "SEEN");
          },
        }
      );
      unsubscribeSubscribeReceiverHasSeenAllMessages = subscribeChatMessage({
        document: SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            receiverId,
          } = subscriptionData.data.senderSubscribeWhenReceiverHasSeenAllMessages;
          updateMessagesStorageWhenReceiverSeenAllMessages(receiverId);
        },
      });
      unsubscribeNotifySendersReceiverOnlineHasReceivedMessages = subscribeChatMessage(
        {
          document: NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES,
          variables: { userId: user._id },
          updateQuery: (_, { subscriptionData }) => {
            const {
              receiver,
            } = subscriptionData.data.notifySendersThatReceiverOnlineHasReceivedMessagesChat;
            updateMessagesStorageToReceivedWhenUserOnline(receiver);
          },
        }
      );
    }
    return () => {
      if (unsubscribeChatMessage) {
        unsubscribeChatMessage();
      }
      if (unsubscribeNotifySenderThatReceiverHasReceivedMessage) {
        unsubscribeNotifySenderThatReceiverHasReceivedMessage();
      }
      if (unsubscribeSubscribeReceiverHasSeenAllMessages) {
        unsubscribeSubscribeReceiverHasSeenAllMessages();
      }
      if (unsubscribeNotifySendersReceiverOnlineHasReceivedMessages) {
        unsubscribeNotifySendersReceiverOnlineHasReceivedMessages();
      }
    };
  }, [subscribeChatMessage, user, currentChat]);
};

export default useChatSubscriptions;
