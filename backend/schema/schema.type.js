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
    sentRequestToAddFriend : [ID!]!
    receivedRequestToAddFriend : [ID!]
    isOnline : Boolean!
    offlinedAt : String
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
    filename: String
    mimetype: String
    data: String
    encoding: String
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

  type PersonalChat{
    _id : ID!
    sender : User!
    receiver : User!
    messageType : MessageTypeEnum!
    receiverStatus :  PersonalChatReceiverStatusEnum!
    senderStatus : PersonalChatSenderStatusEnum!
    text : String
    file : File
    blocked: [User!]
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
    sender : User! 
    receiver : User
    receivers : [ID!]!
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

  type ChatSubscriptionPayload{
    action : PersonalChatReceiverStatusEnum! 
    scope : ChatScopeEnum! 
    message : PersonalChat    
  }

  type SeenAllMessagesSubscriptionPayload{
    action : PersonalChatReceiverStatusEnum!
    scope: ChatScopeEnum!    
    senderId : ID!
    receiverId : ID!
  }

  type UsersContact{
    sender: User!
    receiver : User!
  }

  type ListContact{
    sentRequests : [User!]!   
    receivedRequests : [User!]!    
    friends : [User!]!    
  }
  
  type AddChatResult{
    message : PersonalChat
    scope: ChatScopeEnum!    
    error : Error
  }

  type ConversationsResult{
    conversations : [Conversation!]!
    numberOfConversations : Int!
  }

  type Conversation{
    profile : User!
    messages : [PersonalChat!]
    scope : ChatScopeEnum!
    latestMessage : PersonalChat
    hasSeenLatestMessage : Boolean
  }  

  type MessagesResult{
    messages : [PersonalChat!]    
  }


  type Error{
    message : String!
    statusCode  : Int!
  }
`