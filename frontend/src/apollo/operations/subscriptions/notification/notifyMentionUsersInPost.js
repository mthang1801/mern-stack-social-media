import { gql } from "@apollo/client";

export const NOTIFY_MENTION_USERS_IN_POST = gql`
  subscription ($userId: ID!){
    notifyMentionUsersInPost(userId: $userId) {
      _id 
      field
      action
      href 
      hasSeen
      acceptInvite
      creator{
        _id
        name
        avatar
        slug
      }
      createdAt
    }
  }
`;
