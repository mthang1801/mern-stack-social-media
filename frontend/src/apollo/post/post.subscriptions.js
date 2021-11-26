import { gql } from '@apollo/client';

export const CREATE_COMMENT_SUBSCIPTION = gql`
  subscription CreateCommentSubscription {
    createCommentSubscription {
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

export const LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription LikeCommentSubcription {
    likeCommentSubscription {
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

export const REMOVE_LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription LikeCommentSubcription {
    removeLikeCommentSubscription {
      _id
      post
      likes
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

export const LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription LikeResponseSubscription {
    likeResponseSubscription {
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

export const REMOVE_LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription RemoveLikeResponseSubscription {
    removeLikeResponseSubscription {
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

export const LIKE_POST_SUBSCRIPTION = gql`
  subscription LikePost {
    likePostSubscription {
      _id
      likes
    }
  }
`;
export const REMOVE_LIKE_POST_SUBSCRIPTION = gql`
  subscription RemoveLikePost {
    removeLikePostSubscription {
      _id
      likes
    }
  }
`;
