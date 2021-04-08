import { gql } from "@apollo/client";

export const NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    notifyUserCommentPostSubscription(userId: $userId) {          
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
          post {
            _id
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
