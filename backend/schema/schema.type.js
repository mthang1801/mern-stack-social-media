import { gql } from "apollo-server-express";

export const schemaType = gql`
  type User {
    _id: ID!
    name: String!
    nickname: String
    slug: String!
    email: String!
    password: String
    friends: [String!]!
    posts: [Post!]!
    countPosts : Int
    avatar: String
    comments: [Comment!]!
    responses: [Response!]
    notifications: [ID!]
    following: [ID!]
    followed: [ID!]
    sentRequestToAddFriend: [ID!]
    receivedRequestToAddFriend: [ID!]
    isOnline: Boolean!
    offlinedAt: String
    createdAt: String
    updatedAt: String
  }
  type Post {
    _id: ID!
    text: String
    shortenText : String
    rawText : String
    mentions: [User!]
    status: PostStatusEnum!
    files: [File!]
    author: User!
    likes: [ID!]
    comments: [ID!]
    responses: [ID!]
    createdAt: String!
    updatedAt: String!
  }
  type File {
    filename: String
    mimetype: String
    data: String
    encoding: String
  }
  type Comment {
    _id: ID!
    text: String
    shortenText : String
    rawText : String
    mentions: [ID!]
    author: User!
    post: ID!
    likes: [ID!]
    responses: [ID!]
    createdAt: String
    updatedAt: String
  }
  type Response {
    _id: ID!    
    text: String
    shortenText : String
    rawText : String
    mentions: [ID!]
    author: User!
    comment: ID!
    post: ID!
    likes: [ID!]
    createdAt: String
    updatedAt: String
  }
  type Contact {
    sender: ID!
    receiver: ID!
    status: Boolean!
    createdAt: String!
    updatedAt: String!
  }
 

  type Notification {
    _id: ID!
    field: String!
    content: String!
    creator: User!
    fieldIdentity: NotificationFieldIdentity
    url: String!
    hasSeen: Boolean!
    receivers: [ID!]!
    receiver : ID! 
    isQuestion: Boolean!
    createdAt: String
    updatedAt : String
  }

  type NotificationFieldIdentity {
    post: Post
    sender : User
    receiver : User
    comment: Comment
    response: Response
  }

  type PersonalChat {
    _id: ID!
    sender: User!
    receiver: User!
    messageType: MessageTypeEnum!
    receiverStatus: PersonalChatReceiverStatusEnum!
    senderStatus: PersonalChatSenderStatusEnum!
    text: String
    file: File
    blocked: [User!]
    createdAt: String!
    updatedAt: String!
  }

  type UserAuthPayload {
    user: User!
    token: String!
    tokenExpire: String!
  }

  type SubscriptionNotificationPayload {
    field: String!
    action: ActionEnum!
    sender: User!
    receiver: User
    receivers: [ID!]!
    notification: Notification!
  }

  type ContactSubscriptionPayload {
    action: ContactEnum!
    node: Contact!
  }

  type ChatSubscriptionPayload {
    action: PersonalChatReceiverStatusEnum!
    scope: ChatScopeEnum!
    message: PersonalChat
  }

  type SeenAllMessagesSubscriptionPayload {
    action: PersonalChatReceiverStatusEnum!
    scope: ChatScopeEnum!
    senderId: ID!
    receiverId: ID!
  }

  type UsersContact {
    sender: User!
    receiver: User!
  }

  type ListContact {
    sentRequests: [User!]!
    receivedRequests: [User!]!
    friends: [User!]!
  }

  type AddChatResult {
    message: PersonalChat
    scope: ChatScopeEnum!
    error: Error
  }

  type ConversationsResult {
    conversations: [Conversation!]!
    numberOfConversations: Int!
  }

  type Conversations {
    conversations: [Conversations!]!
  }

  type Conversation {
    profile: User!
    messages: [PersonalChat!]!
    scope: ChatScopeEnum!
    latestMessage: PersonalChat
    hasSeenLatestMessage: Boolean
  }

  type ListSendersConversationsPayload {
    senders: [ID!]!
    receiver: ID!
  }

  type PostSupscriptionPayload {
    post: Post!
    notification: Notification!
  }

  type CommentSubscriptionPayload {
    comment: Comment
    notification: Notification    
  }

  type ResponseSubscriptionPayload{
    response : Response
    notification: Notification    
  }

  type MessagesResult {
    messages: [PersonalChat!]
  }

  type Error {
    message: String!
    statusCode: Int!
  }
`;
