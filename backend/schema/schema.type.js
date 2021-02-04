import {gql} from "apollo-server-express"

export const schemaType = gql`
  type User{
    _id : ID! 
    name : String! 
    email : String! 
    password : String
    friends : [User!]!
    posts : [Post!]!
    comments : [Comment!]!    
    createdAt : String
    updatedAt : String
  }
  type Post{
    _id : ID! 
    title : String! 
    content : String!
    status : PostStatus!
    author : User! 
    comments : [Comment]
    createdAt : String!
    updatedAt : String!
  }
  type Comment {
    _id : ID! 
    content : String!
    author : User! 
    post : Post!
    createdAt : String 
    updatedAt : String
  }
  type Contact{
    sender : ID! 
    receiver : ID!
    status : Boolean!    
    createdAt : String!
    updatedAt : String!
  } 
  type PrivateChat{
    sender : User! 
    receiver : User!
    status : PrivateChatEnum! 
    text : String! 
    createdAt : String!
    updatedAt : String!
  }
  type UserAuthPayload{
    user : User! 
    token : String!
    tokenExpire : String! 
  }
  type PostSubscriptionPayload{
    action : ActionEnum! 
    node : Post!
  }  
  type CommentSubscriptionPayload{
    action : ActionEnum!
    node : Comment
  }  
 
  type ContactSubscriptionPayload{
    action : ContactEnum!
    node : Contact!
  }
  type PrivateChatSubsciptionPayload{
    action : PrivateChatEnum! 
    node : PrivateChat!
  }
  
`