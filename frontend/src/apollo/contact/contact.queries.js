import { gql } from '@apollo/client';

export const FETCH_LIST_CONTACT = gql`
  query {
    fetchListContact {
      sentRequests {
        _id
        name
        slug
        avatar
        email
      }
      receivedRequests {
        _id
        name
        slug
        avatar
        email
      }
      friends {
        _id
        name
        slug
        email
        avatar
        isOnline
        offlinedAt
      }
    }
  }
`;

export const FETCH_USER_FRIENDS_DATA = gql`
  query FetchUserFriends($skip: Int, $limit: Int, $except: [ID!], $userId: ID) {
    fetchFriends(skip: $skip, limit: $limit, except: $except, userId: $userId) {
      _id
      name
      slug
      email
      avatar
      isOnline
      offlinedAt
      createdAt
    }
  }
`;

export const FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND = gql`
  query ($skip: Int, $limit: Int) {
    fetchReceivedRequestToAddFriend(skip: $skip, limit: $limit) {
      _id
      name
      slug
      avatar
    }
  }
`;

export const FETCH_SENT_REQUEST_TO_ADD_FRIEND = gql`
  query ($skip: Int, $limit: Int) {
    fetchSentRequestToAddFriend(skip: $skip, limit: $limit) {
      _id
      name
      slug
      avatar
    }
  }
`;
