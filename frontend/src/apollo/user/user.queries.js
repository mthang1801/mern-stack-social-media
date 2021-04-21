import { gql } from "@apollo/client";

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

export const FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND = gql`
  query ($skip : Int, $limit : Int){
    fetchReceivedRequestToAddFriend(skip : $skip, limit: $limit){
      _id
      name
      slug
      avatar
    }
  }
`


export const FETCH_SENT_REQUEST_TO_ADD_FRIEND = gql`
  query($skip: Int, $limit: Int) {
    fetchSentRequestToAddFriend(skip: $skip, limit: $limit) {
      _id
      name
      slug
      avatar
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


export const SEARCH_FRIENDS = gql`
  query($search: String!) {
    searchFriends(search: $search) {
      _id
      name
      avatar
      slug
    }
  }
`;


