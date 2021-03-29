import { gql } from "apollo-server-express";

export const schemaMutation = gql`
  type Mutation {    
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data : PostInput!): Post!    
    likePost(postId : ID!) : Boolean!
    unlikePost(postId: ID!) : Boolean!
    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(commentId: ID!, data: CommentInput!): Comment!
    deleteComment(commentId: ID!): Comment!
    updateUserHasSeenNotification(notificationId: ID!): Notification!
    addContact(receiverId: ID!, message: String!): Boolean!
    acceptContact(senderId: ID!): Boolean!    


    sendRequestToAddFriend(userId: ID!): UsersContact!
    acceptRequestToAddFriend(senderId: ID!): UsersContact!
    removeFriend(friendId: ID!): UsersContact!
    rejectRequestToAddFriend(senderId: ID!): UsersContact!
    cancelRequestToAddFriend(receiverId: ID!): UsersContact!
    followUser(userId : ID!): UsersContact!
    unFollowUser(userId: ID!) : UsersContact!

    sendMessageChatText(receiverId: ID!, text : String!, scope: String!): AddChatResult!
    sendMessageChatFile(receiverId: ID!, file : ChatFileInput!, scope: String!, messageType: String!) : AddChatResult
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched(listSenderId : [ID!]!) : Boolean!   
    updatePersonalReceiverWhenReceivedNewMessage(messageId: ID!, messageStatus : String!) : Boolean!
    updateHaveSeenAllMessages(conversationId: ID!, scope: String!) : Boolean
  }
`;
