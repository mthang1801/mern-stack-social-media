import { gql } from '@apollo/client';

export const CREATE_COMMENT_SUBSCIPTION = gql`
  subscription ($userId: ID!) {
    createCommentSubscription(userId: $userId) {
      _id
      text
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
      updatedAt
    }
  }
`;

export const CREATE_RESPONSE_SUBSCRIPTION = gql`
  subscription {
    createResponseSubscription {
      _id
      text
      shortenText
      rawText
      author {
        _id
        name
        slug
        avatar
      }
      comment
      post
      likes
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_POST_SUBSCRIPTION = gql`
  subscription EditPost {
    editPostSubscription {
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
