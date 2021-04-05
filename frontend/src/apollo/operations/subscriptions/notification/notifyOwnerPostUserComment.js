import { gql } from "@apollo/client";

export const NOTIFY_OWNER_POST_USER_COMMENT_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    notifyOwnerPostUserComment(userId: $userId) {
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
        url
        isQuestion
        createdAt
      }
    }
  }
`;
