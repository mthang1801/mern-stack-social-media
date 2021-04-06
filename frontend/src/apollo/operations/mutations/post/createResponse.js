import { gql } from "@apollo/client";

export const CREATE_RESPONSE = gql`
  mutation CreateResponse(
    $commentId: ID!
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
  ) {
    createResponse(
      commentId: $commentId
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
      comment
      likes
      post
      createdAt
    }
  }
`;
