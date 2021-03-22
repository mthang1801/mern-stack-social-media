import { gql } from "@apollo/client";

export const SEND_MESSAGE_CHAT_FILE = gql`
  mutation(
    $receiverId: ID!
    $encoding: String!
    $filename: String!
    $mimetype: String!
    $scope: String!
    $messageType: String!
  ) {
    sendMessageChatFile(
      receiverId: $receiverId,
      file: { encoding: $encoding, filename: $filename, mimetype: $mimetype },
      scope: $scope,
      messageType: $messageType
    ) {
      message {
        _id
        sender {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        receiver {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        messageType
        file{
          data
          filename
          mimetype
        }
        receiverStatus
        senderStatus
        text
        createdAt
        updatedAt
      }
      scope
      error {
        message
        statusCode
      }
    }
  }
`;
