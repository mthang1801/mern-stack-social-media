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
        subComments {
          _id
          text
        }
        createdAt
      }
      notification {
        _id
        field
        action
        href
        hasSeen
        acceptInvite
        creator {
          _id
          name
          avatar
          slug
        }
        createdAt
      }
    }
  }
`;
