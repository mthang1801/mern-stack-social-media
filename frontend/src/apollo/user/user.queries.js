import { gql } from "@apollo/client";

const FETCH_CURRENT_USER = gql`
  query {
    fetchCurrentUser {
      _id
      name
      nickname
      slug
      email
      friends
      notifications
      avatar
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
  }
`;

const FETCH_USER_FRIENDS_DATA = gql`
  query FetchUserFriends($skip: Int, $limit: Int, $userId: ID) {
    fetchFriends(skip: $skip, limit: $limit, userId: $userId) {
      _id
      name
      slug
      avatar
      isOnline
      offlinedAt
      createdAt
    }
  }
`;

export default {
  FETCH_CURRENT_USER,
  FETCH_USER_FRIENDS_DATA
};
