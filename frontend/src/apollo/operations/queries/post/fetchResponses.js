import { gql } from "@apollo/client";

export const FETCH_RESPONSES = gql`
  query($commentId: ID!, $skip: Int, $limit: Int) {
    fetchResponses(commentId: $commentId, skip: $skip, limit: $limit) {
      _id
      text
      author {
        _id
        name
        slug
        avatar
      }
      comment
      likes
      post
      createdAt
      updatedAt
    }
  }
`;
