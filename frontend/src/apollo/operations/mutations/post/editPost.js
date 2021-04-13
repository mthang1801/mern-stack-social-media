import { gql } from "@apollo/client";

export const EDIT_POST = gql`
  mutation EditPost(
    $postId : ID!
    $text: String
    $shortenText: String
    $rawText : String
    $mentions: [ID!]
    $fileNames: [String!]
    $fileMimetype: [String!]
    $fileEncodings: [String!]
    $status: String!
  ) {
    editPost(
      postId : $postId,
      data: {
        text: $text
        shortenText: $shortenText
        rawText : $rawText
        mentions: $mentions
        fileNames: $fileNames
        fileMimetype: $fileMimetype
        fileEncodings: $fileEncodings
        status: $status
      }
    ) {
      _id
      text
      rawText
      shortenText
      mentions {
        _id
        name
        avatar
        slug
        isOnline
      }      
      author {
        _id
        name
        slug
        avatar
      }
      files{
        filename
        mimetype
        data
      }
      comments       
      responses     
      likes      
      status
      createdAt
    }
  }
`;
