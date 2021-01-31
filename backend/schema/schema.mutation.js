import {gql} from "apollo-server-express";

export const schemaMutation = gql`
  type Mutation{
    createUser(data : CreateUserInput!) : UserAuthPayload!
    createPost(data : CreatePostInput!) : Post!
    updatePost(postId : ID!, data : UpdatePostInput) : Post!
    deletePost(postId: ID!) : Post!
    createComment(postId : ID!, data : CommentInput!) : Comment! 
    updateComment(commentId : ID!, data : CommentInput!) : Comment!
    deleteComment(commentId: ID!) : Comment!     
    addContact(receiverId : ID!, message: String!) : Boolean!
    acceptContact(senderId: ID!) : Boolean!
    addPrivateChat(receiverId: ID!, text : String!) : PrivateChat!
  }
`