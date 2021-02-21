import {gql} from "apollo-server-express"

export const schemaType = gql`
  type User{
    _id : ID!     
    name : String! 
    nickname : String
    slug : String!
    email : String! 
    password : String
    friends : [String!]!
    posts : [Post!]!
    avatar: String
    comments : [Comment!]!    
    notifications : [Notification!]!
    following : [ID!]!
    followed : [ID!]!
    sendRequestToAddFriend : [ID!]!
    receiveRequestToAddFriend : [ID!]
    createdAt : String
    updatedAt : String
  }
  type Post{
    _id : ID! 
    text : String!   
    mentions : [User!]
    status : PostStatus!
    files : [File!]
    author : User! 
    comments : [Comment]
    createdAt : String!
    updatedAt : String!
  }
  type File{
    filename: String!
    mimetype: String!
    encoding: String!
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

  type Notification{
    _id : ID!
    field : String! 
    action: String! 
    creator : User!
    href : String!
    hasSeen : [ID!]! 
    receivers : [ID!]!
    acceptInvite : Boolean!
    createdAt : String!     
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

  type SubscriptionNotificationPayload{
    field : String!
    action : ActionEnum!    
    receivers : [ID!]
    notification : Notification!
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

  type UsersContact{
    sender: User!
    receiver : User!
  }
  
`