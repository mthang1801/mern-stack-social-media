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
  input CreatePostInput{
    title : String! 
    content : String! 
    status : String    
  }
  input UpdatePostInput{
    title : String 
    content : String
    status : String
  }
  input CommentInput{
    content : String!
  }
`