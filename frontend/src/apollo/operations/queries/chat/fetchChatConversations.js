import { gql } from "@apollo/client";

export const FETCH_CHAT_CONVERSATIONS = gql`
  query($skip: Int, $limit: Int) {
    fetchChatConversations(skip: $skip, limit: $limit) {
      conversations {
        profile {
          _id
          name
          slug
          avatar
        }
        messages {
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
            data
            filename
            mimetype
          }
          createdAt
          updatedAt
        }
        scope
        latestMessage {
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
          receiverStatus
          senderStatus
          text
          file {
            data
            filename
            mimetype
          }
          createdAt
          updatedAt
        }
        hasSeenLatestMessage
      }
      numberOfConversations
    }
  }
`;
