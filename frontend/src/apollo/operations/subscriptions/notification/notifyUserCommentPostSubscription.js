import { gql } from "@apollo/client";

export const NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    notifyUserCommentPostSubscription(userId: $userId) {
      comment {
        _id
        text
        author {
          _id
          name
          avatar
          slug
        }
        post
        likes
        responses
        createdAt
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
  }
`;
