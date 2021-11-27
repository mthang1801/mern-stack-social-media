import { gql } from '@apollo/client';

export const FETCH_CURRENT_USER = gql`
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

export const FETCH_PERSONAL_USER = gql`
  query FetchPersonalUser($slug: String!) {
    fetchPersonalUser(slug: $slug) {
      _id
      name
      nickname
      slug
      email
      friends
      notifications
      avatar
      posts
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
  }
`;

export const LOGIN = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      user {
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
      token
      tokenExpire
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  query LoginWithGoogle(
    $name: String
    $email: String!
    $googleId: ID!
    $imageUrl: String
  ) {
    loginUserWithGoogle(
      data: {
        name: $name
        email: $email
        googleId: $googleId
        imageUrl: $imageUrl
      }
    ) {
      user {
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
      token
      tokenExpire
    }
  }
`;

export const SEARCH_FRIENDS = gql`
  query ($search: String!) {
    searchFriends(search: $search) {
      _id
      name
      avatar
      slug
    }
  }
`;
