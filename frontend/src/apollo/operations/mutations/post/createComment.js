import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation($postId: ID!, $text: String, $mentions: [ID!]) {
    createComment(postId: $postId, data: { text: $text, mentions: $mentions }) {
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
  }
`;
