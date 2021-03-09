import { gql } from "@apollo/client";

export const SENT_MESSAGE_CHAT_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    sentMessageChatSubscription(userId: $userId) {
      action
      status
      message {
        _id
        sender {
          _id
          name
          slug
          avatar
        }
        receiver {
          _id
          name
          slug
          avatar
        }
        messageType
        receiverStatus
        senderStatus
        text
        file {
          encoding
          filename
          mimetype
        }
        blocked {
          _id
          slug
        }
        createdAt
        updatedAt
      }
    }
  }
`;
