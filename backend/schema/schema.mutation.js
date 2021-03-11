import { gql } from "apollo-server-express";

export const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data: PostInput!): Post!
    updatePost(postId: ID!, data: PostInput!): Post!
    deletePost(postId: ID!): Post!
    updateUserHasSeenNotification(notificationId: ID!): Notification!
    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(commentId: ID!, data: CommentInput!): Comment!
    deleteComment(commentId: ID!): Comment!
    addContact(receiverId: ID!, message: String!): Boolean!
    acceptContact(senderId: ID!): Boolean!    

    sendRequestToAddFriend(userId: ID!): UsersContact!
    acceptRequestToAddFriend(senderId: ID!): UsersContact!
    removeFriend(friendId: ID!): UsersContact!
    rejectRequestToAddFriend(senderId: ID!): UsersContact!
    cancelRequestToAddFriend(receiverId: ID!): UsersContact!
    followUser(userId : ID!): UsersContact!
    unFollowUser(userId: ID!) : UsersContact!

    sendMessageChatText(receiverId: ID!, text : String!, status: String!): AddChatResult!
    sendMessageChatFile(receiverId: ID!, file : ChatFileInput!, status: String!, messageType: String!) : AddChatResult
    updatePrivateReceiverStatusSentToDeliveredWhenReceiverFetched(listSenderId : [ID!]!) : Boolean!   
    updatePrivateReceiverWhenReceivedNewMessage(messageId: ID!, messageStatus : String!) : Boolean!
    updateHaveSeenAllMessages(conversationId: ID!, status: String!) : Boolean
  }
`;
