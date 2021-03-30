import {gql} from "apollo-server-express";

export const schemaInput = gql`
  input CreateUserInput{
    name : String!
    email : String! 
    password : String!
  }
  input LoginUserInput{
    email : String! 
    password : String!
  }
  
  input PostInput{
    text : String
    mentions : [ID!]
    fileNames : [String!]
    fileMimetype : [String!]
    fileEncodings : [String!]
    status : String!
  }
  
  input CommentInput{
    text : String
    mentions : [ID!]
  }

  input MessageInput{
    text : String
    encoding: String
    mimetype : String
    filename : String
  }

  input ChatFileInput{
    encoding : String!
    filename : String!
    mimetype : String!
  }
`