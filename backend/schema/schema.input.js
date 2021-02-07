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
    text : String !
    mentions : [String!]!
    tags : [String!]
    fileNames : [String!]
    fileEncoding : [String!]
    fileMimetype : [String!]
    status : String    
  }
  
  input CommentInput{
    content : String!
  }
`