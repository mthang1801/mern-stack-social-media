import { gql } from '@apollo/client';
export const CREATE_POST = gql`
  mutation CreatePost(
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
    $fileNames: [String!]
    $fileMimetype: [String!]
    $fileEncodings: [String!]
    $status: String!
  ) {
    createPost(
      data: {
        text: $text
        shortenText: $shortenText
        rawText: $rawText
        mentions: $mentions
        fileNames: $fileNames
        fileMimetype: $fileMimetype
        fileEncodings: $fileEncodings
        status: $status
      }
    ) {
      _id
      text
      rawText
      shortenText
      mentions {
        _id
        name
        avatar
        slug
        isOnline
      }
      author {
        _id
        name
        slug
        avatar
      }
      files {
        filename
        mimetype
        data
      }
      comments
      responses
      likes
      status
      createdAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation (
    $postId: ID!
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
  ) {
    createComment(
      postId: $postId
      data: {
        text: $text
        shortenText: $shortenText
        rawText: $rawText
        mentions: $mentions
      }
    ) {
      _id
      text
      shortenText
      rawText
      author {
        _id
        name
        avatar
        slug
      }
      post
      likes
      responses
      createdAt
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation CreateResponse(
    $commentId: ID!
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
  ) {
    createResponse(
      commentId: $commentId
      data: {
        text: $text
        shortenText: $shortenText
        rawText: $rawText
        mentions: $mentions
      }
    ) {
      _id
      text
      shortenText
      rawText
      author {
        _id
        name
        avatar
        slug
      }
      comment
      likes
      post
      createdAt
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost(
    $postId: ID!
    $text: String
    $shortenText: String
    $rawText: String
    $mentions: [ID!]
    $fileNames: [String!]
    $fileMimetype: [String!]
    $fileEncodings: [String!]
    $status: String!
  ) {
    editPost(
      postId: $postId
      data: {
        text: $text
        shortenText: $shortenText
        rawText: $rawText
        mentions: $mentions
        fileNames: $fileNames
        fileMimetype: $fileMimetype
        fileEncodings: $fileEncodings
        status: $status
      }
    ) {
      _id
      text
      rawText
      shortenText
      mentions {
        _id
        name
        avatar
        slug
        isOnline
      }
      author {
        _id
        name
        slug
        avatar
      }
      files {
        filename
        mimetype
        data
      }
      comments
      responses
      likes
      status
      createdAt
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId)
  }
`;

export const LIKE_POST = gql`
  mutation ($postId: ID!) {
    likePost(postId: $postId)
  }
`;
export const LIKE_RESPONSE = gql`
  mutation LikeResponse($responseId: ID!) {
    likeResponse(responseId: $responseId)
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId)
  }
`;
export const REMOVE_LIKE_COMMENT = gql`
  mutation RemoveLikeComment($commentId: ID!) {
    removeLikeComment(commentId: $commentId)
  }
`;

export const REMOVE_LIKE_POST = gql`
  mutation ($postId: ID!) {
    removeLikePost(postId: $postId)
  }
`;

export const REMOVE_LIKE_RESPONSE = gql`
  mutation RemoveLikeResponse($responseId: ID!) {
    removeLikeResponse(responseId: $responseId)
  }
`;

export const REMOVE_RESPONSE = gql`
  mutation RemoveResponse($responseId: ID!) {
    removeResponse(responseId: $responseId)
  }
`;

export default {
  CREATE_POST,
  CREATE_COMMENT,
  CREATE_RESPONSE,
  EDIT_POST,
  LIKE_COMMENT,
  LIKE_POST,
  LIKE_RESPONSE,
  REMOVE_COMMENT,
  REMOVE_LIKE_COMMENT,
  REMOVE_LIKE_POST,
  REMOVE_LIKE_RESPONSE,
  REMOVE_RESPONSE,
};
