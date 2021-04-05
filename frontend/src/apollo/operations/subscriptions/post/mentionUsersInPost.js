import { gql } from "@apollo/client";

export const MENTION_USERS_IN_POST_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    mentionUsersInPost(userId: $userId) {
      sender {
        _id
        name
        avatar
        slug
        isOnline
      }
      notification {
        _id
        field
        content
        hasSeen
        creator {
          _id
          name
          avatar
        }
        url
        isQuestion
        createdAt
      }
    }
  }
`;
