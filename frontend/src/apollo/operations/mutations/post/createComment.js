import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation(
    $postId: ID!
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
  ) {
    createComment(
      postId: $postId
      data: {
        text: $text
        shortenText: $shortenText
        rawText: $rawText
        mentions: $mentions
      }
    ) {
      _id
      text
      shortenText
      rawText
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
