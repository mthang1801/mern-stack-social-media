import { gql } from "@apollo/client";

export const NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES = gql`
  subscription($userId: ID!) {
    notifySendersThatReceiverOnlineHasReceivedMessagesChat(userId: $userId) {      
      receiver
    }
  }
`;
