import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation ($text : String, $mentions : [ID!], $fileNames : [String!],
    $fileMimetype : [String!],
    $fileEncodings : [String!], 
    $status: String!) {
    createPost(
      data : {
        text : $text
        mentions : $mentions
        fileNames : $fileNames
        fileMimetype : $fileMimetype
        fileEncodings : $fileEncodings
        status : $status
      }
    ) {
      _id
      text
      mentions {
        _id
        name        
        slug
        avatar
        isOnline
        offlinedAt
      }
      author{
        _id
        name
        slug
        avatar        
      }
      likes
      status
      createdAt
    }
  }
`;
