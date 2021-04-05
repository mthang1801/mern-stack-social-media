import { gql } from "@apollo/client";

export const NOTIFY_MENTION_USERS_IN_POST = gql`
  subscription ($userId: ID!){
    notifyMentionUsersInPost(userId: $userId) {
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
`;
