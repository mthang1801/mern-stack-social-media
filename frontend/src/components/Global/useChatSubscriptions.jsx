import React, { useEffect } from "react";
import chatSubscriptions from "../../apollo/operations/subscriptions/chat";
import { FETCH_INITIAL_CHAT_MESSAGES } from "../../apollo/operations/queries/chat/fetchInitialChatMessages";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/operations/queries/cache";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { UPDATE_PRIVATE_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVED_NEW_MESSAGE } from "../../apollo/operations/mutations/chat/private/updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage";
const useChatSubscriptions = () => {
  const {
    subscribeToMore: subscribeChatMessage,
  } = useQuery(FETCH_INITIAL_CHAT_MESSAGES, {
    skip: true,
    fetchPolicy: "cache-and-network",
  });
  const {SENT_MESSAGE_CHAT_SUBSCRIPTION, NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT} = chatSubscriptions
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const { setMessagesStorage, updateMessagesStorage } = cacheMutations;
  const [
    updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage,
  ] = useMutation(
    UPDATE_PRIVATE_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVED_NEW_MESSAGE
  );
  useEffect(() => {
    let unsubscribeChatMessage;
    let unsubscribeNotifySenderThatReceiverHasReceivedMessage; 
    if (subscribeChatMessage && user) {
      unsubscribeChatMessage = subscribeChatMessage({
        document: SENT_MESSAGE_CHAT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            action,
            status,
            message,
          } = subscriptionData.data.sentMessageChatSubscription;
          const { sender } = message;      
          setMessagesStorage(sender, message, status, false);
          //update Delivered status
          updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage({
            variables: { messageId: message._id },
          }).then((res) => console.log(res));
        },
      });
      unsubscribeNotifySenderThatReceiverHasReceivedMessage = subscribeChatMessage({
        document : NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT,
        variables : {userId: user._id},
        updateQuery : (_, {subscriptionData}) => {
          const {action, status, message} = subscriptionData.data.notifySenderThatReceiverHasReceivedMessageChat;
          const {receiver} = message;
          updateMessagesStorage(receiver, message, status, false );
        }
      })
    }
    return () => {
      if (unsubscribeChatMessage) {
        unsubscribeChatMessage();
      }
      if(unsubscribeNotifySenderThatReceiverHasReceivedMessage){
        unsubscribeNotifySenderThatReceiverHasReceivedMessage()
      }
    };
  }, [subscribeChatMessage, user]);
};

export default useChatSubscriptions;
