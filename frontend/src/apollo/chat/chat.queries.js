import { gql } from "@apollo/client";

export const FETCH_CHAT_CONVERSATIONS = gql`
  query($except: [ID!], $skip: Int, $limit: Int) {
    fetchChatConversations(except: $except, skip: $skip, limit: $limit) {
      conversations {
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
      numberOfConversations
    }
  }
`;

export const FETCH_MESSAGES = gql`
  query($conversationId: ID!, $scope: String!, $skip: Int!, $limit: Int!) {
    fetchMessages(
      conversationId: $conversationId
      scope: $scope
      skip: $skip
      limit: $limit
    ) {
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
    }
  }
`;

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
