import { gql } from "@apollo/client";

export const REMOVE_LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription {
    removeLikeCommentSubscription {
      comment {
        _id
        post
        likes
        author {
          _id
          name
          slug
        }
      }

      notification {
        _id
        field
        content
        url
        hasSeen
        creator {
          _id
          name
          avatar
          slug
        }
        fieldIdentity {
          post {
            _id
          }
          comment {
            _id
            shortenText
          }
        }
        receiver
        createdAt
        updatedAt
      }
    }
  }
`;
