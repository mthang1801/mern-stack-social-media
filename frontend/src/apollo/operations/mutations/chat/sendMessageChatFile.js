import { gql } from "@apollo/client";

export const SEND_MESSAGE_CHAT_FILE = gql`
  mutation(
    $receiverId: ID!
    $encoding: String!
    $filename: String!
    $mimetype: String!
    $status: String!
    $messageType: String!
  ) {
    sendMessageChatFile(
      receiverId: $receiverId,
      file: { encoding: $encoding, filename: $filename, mimetype: $mimetype },
      status: $status,
      messageType: $messageType
    ) {
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
      status
      error {
        message
        statusCode
      }
    }
  }
`;
