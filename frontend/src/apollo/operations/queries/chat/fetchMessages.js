import { gql } from "@apollo/client";

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
