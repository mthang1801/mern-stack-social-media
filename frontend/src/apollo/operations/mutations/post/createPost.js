import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost(
    $text: String!
    $mentions: [String!]!
    $fileNames: [String!]
    $fileMimetype: [String!]
    $fileEncoding: [String!]
    $status : String
  ) {
    createPost(
      data: {
        text: $text
        mentions: $mentions
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
      status
      createdAt
    }
  }
`;
