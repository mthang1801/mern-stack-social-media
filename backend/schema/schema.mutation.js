import {gql} from "apollo-server-express";

export const schemaMutation = gql`
  type Mutation{
    createUser(data : CreateUserInput!) : UserAuthPayload!
    createPost(data : PostInput!) : Post!
    updatePost(postId : ID!, data : PostInput!) : Post!
    deletePost(postId: ID!) : Post!
    updateUserHasSeenNotification(notificationId : ID!) : Notification!
    createComment(postId : ID!, data : CommentInput!) : Comment! 
    updateComment(commentId : ID!, data : CommentInput!) : Comment!
    deleteComment(commentId: ID!) : Comment!     
    addContact(receiverId : ID!, message: String!) : Boolean!
    acceptContact(senderId: ID!) : Boolean!
    addPrivateChat(receiverId: ID!, text : String!) : PrivateChat!
  }
`