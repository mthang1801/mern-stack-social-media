import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost(
    $text: String!
    $mentions: [String!]!
    $tags: [String!]!
    $fileNames: [String!]
    $fileMimetype: [String!]
    $fileEncoding: [String!]
    $status : String!
  ) {
    createPost(
      data: {
        text: $text
        mentions: $mentions
        tags: $tags
        fileNames: $fileNames
        fileMimetype: $fileMimetype
        fileEncoding: $fileEncoding
        status : $status
      }
    ) {
      _id
      text
      mentions {
        _id
        name
        email
      }
      tags
      status
      createdAt
    }
  }
`;
