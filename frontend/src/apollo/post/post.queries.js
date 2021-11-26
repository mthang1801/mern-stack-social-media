import { gql } from '@apollo/client';

export const FETCH_POSTS = gql`
  query ($userId: ID, $skip: Int, $limit: Int) {
    fetchPosts(userId: $userId, skip: $skip, limit: $limit) {
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

export const FETCH_COMMENTS = gql`
  query FetchComments($postId: ID!, $except: [ID!], $skip: Int, $limit: Int) {
    fetchComments(
      postId: $postId
      except: $except
      skip: $skip
      limit: $limit
    ) {
      _id
      text
      mentions
      author {
        _id
        name
        avatar
        slug
        isOnline
        offlinedAt
      }
      post
      likes
      responses
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_RESPONSES = gql`
  query FetchResponses($commentId: ID!, $skip: Int, $limit: Int) {
    fetchResponses(commentId: $commentId, skip: $skip, limit: $limit) {
      _id
      text
      author {
        _id
        name
        slug
        avatar
      }
      comment
      likes
      post
      createdAt
      updatedAt
    }
  }
`;
