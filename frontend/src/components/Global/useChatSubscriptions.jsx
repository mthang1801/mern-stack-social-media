import { useEffect } from "react";
import chatSubscriptions from "../../apollo/operations/subscriptions/chat";
import { FETCH_CHAT_CONVERSATIONS } from "../../apollo/operations/queries/chat/fetchChatConversations";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_CURRENT_CHAT,
} from "../../apollo/operations/queries/cache";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { UPDATE_PERSONAL_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE } from "../../apollo/operations/mutations/chat";

const useChatSubscriptions = () => {
  const { subscribeToMore: subscribeChatMessage } = useQuery(
    FETCH_CHAT_CONVERSATIONS,
    {
      skip: true,
      fetchPolicy: "cache-and-network",
    }
  );
  const {
    SENT_MESSAGE_CHAT_SUBSCRIPTION,
    NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT,
    SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES,
    NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES,
  } = chatSubscriptions;
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-only" });
  const {
    setMessagesStorage,
    updateMessagesStorage,
    updateMessagesStorageWhenReceiverSeenAllMessages,
    updateMessagesStorageToReceivedWhenUserOnline,
  } = cacheMutations;
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
      if(unsubscribeNotifySendersReceiverOnlineHasReceivedMessages){
        unsubscribeNotifySendersReceiverOnlineHasReceivedMessages()
      }
    };
  }, [subscribeChatMessage, user, currentChat]);
};

export default useChatSubscriptions;
