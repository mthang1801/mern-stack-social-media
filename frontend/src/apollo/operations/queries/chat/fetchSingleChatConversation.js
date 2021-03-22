import { gql } from "@apollo/client";

export const FETCH_SINGLE_CHAT_CONVERSATION = gql`
query ($conversationId : ID!, $scope : String!){
  fetchSingleChatConversation(conversationId : $conversationId, scope : $scope){
    profile {
      _id
      name
      slug
      avatar
      isOnline
      offlinedAt
      createdAt
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
}
`;
