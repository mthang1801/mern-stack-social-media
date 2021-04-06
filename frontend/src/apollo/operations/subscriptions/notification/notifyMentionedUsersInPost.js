import { gql } from "@apollo/client";

export const NOTIFY_MENTIONED_USERS_IN_POST = gql`
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
      fieldIdentity{
        post{
          shortenText
        }
      }
      url
      isQuestion
      createdAt
      updatedAt
    }
  }
`;
