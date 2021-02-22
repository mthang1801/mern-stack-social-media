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
    addPrivateChat(receiverId: ID!, text: String!): PrivateChat!

    sendRequestToAddFriend(userId: ID!): Boolean!
    acceptRequestToAddFriend(userId: ID!): Boolean!
    rejectRequestToAddFriend(senderId: ID!): Boolean!
    cancelRequestToAddFriend(receiverId: ID!): Boolean!
    followUser(userId : ID!): Boolean!
    unFollowUser(userId: ID!) : Boolean!
  }
`;
