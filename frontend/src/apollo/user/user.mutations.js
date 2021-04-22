import { gql } from "@apollo/client";

export const FOLLOW_USER =  gql`
  mutation ($userId : ID!){ 
    followUser(userId: $userId){
      sender {
        _id
        slug
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
      }
      receiver {
        _id
        slug
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
      }
    }
  }
`


export const SIGNUP = gql`
  mutation SignUp($name : String!, $email: String!, $password: String!){
    createUser(data : {
      name : $name
      email : $email
      password : $password
    }){
      user{
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
`


export const UNFOLLOW_USER = gql`
  mutation ($userId : ID!){
    unFollowUser(userId: $userId){
      sender {
        _id
        slug
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
      }
      receiver {
        _id
        slug
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
      }
    }
  }
`