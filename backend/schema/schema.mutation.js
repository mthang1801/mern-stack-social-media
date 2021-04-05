import { gql } from "apollo-server-express";

export const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data: PostInput!): Post!
    likePost(postId: ID!): Boolean!
    removeLikePost(postId: ID!): Boolean!
    createComment(postId: ID!, data: CommentInput!): Comment!
    removeComment(commentId: ID!): Boolean!
    removeResponse(responseId: ID!): Boolean!
    likeComment(commentId: ID!): Boolean!
    likeResponse(responseId: ID!): Boolean!
    removeLikeComment(commentId: ID!): Boolean!
    removeLikeResponse(responseId: ID!): Boolean!
    createResponse(commentId: ID!, data: CommentInput!): Response!
    updateUserHasSeenNotification(notificationId: ID!): Boolean!
    addContact(receiverId: ID!, message: String!): Boolean!
    acceptContact(senderId: ID!): Boolean!

    sendRequestToAddFriend(userId: ID!): UsersContact!
    acceptRequestToAddFriend(senderId: ID!): UsersContact!
    removeFriend(friendId: ID!): UsersContact!
    rejectRequestToAddFriend(senderId: ID!): UsersContact!
    cancelRequestToAddFriend(receiverId: ID!): UsersContact!
    followUser(userId: ID!): UsersContact!
    unFollowUser(userId: ID!): UsersContact!

    sendMessageChatText(
      receiverId: ID!
      text: String!
      scope: String!
    ): AddChatResult!
    sendMessageChatFile(
      receiverId: ID!
      file: ChatFileInput!
      scope: String!
      messageType: String!
    ): AddChatResult
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched(
      listSenderId: [ID!]!
    ): Boolean!
    updatePersonalReceiverWhenReceivedNewMessage(
      messageId: ID!
      messageStatus: String!
    ): Boolean!
    updateHaveSeenAllMessages(conversationId: ID!, scope: String!): Boolean
  }
`;
