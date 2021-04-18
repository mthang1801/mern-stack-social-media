import { gql } from "@apollo/client";

export const ACCEPT_REQUEST_TO_ADD_FRIEND = gql`
  mutation($senderId: ID!) {
    acceptRequestToAddFriend(senderId: $senderId) {
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
      notification { 
        _id
      }
    }
  }
`;


export const CANCEL_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($receiverId: ID!){
    cancelRequestToAddFriend(receiverId : $receiverId){
      sender {
        _id
        slug
        following        
        followed  
        receivedRequestToAddFriend
        sentRequestToAddFriend                
        friends
      }
      receiver {
        _id
        slug        
        following        
        followed  
        receivedRequestToAddFriend
        sentRequestToAddFriend                
        friends       
      }
    }
  }
`


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


export const REJECT_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($senderId : ID!){
    rejectRequestToAddFriend(senderId : $senderId){
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
      notification{
        _id
      }
    }
  }
`


export const REMOVE_FRIEND = gql`
  mutation ($friendId : ID!){
    removeFriend(friendId : $friendId){
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
      notification{
        _id
      }
    }
  }
`


export const SEND_REQUEST_TO_ADD_FRIEND = gql`
  mutation SendRequestToAddFriendMutation($receiverId : ID!){
    sendRequestToAddFriend(receiverId: $receiverId){
      sender {
        _id
        slug                
        following        
        sentRequestToAddFriend    
        followed        
        receivedRequestToAddFriend    
        friends
      }
      receiver {
        _id
        slug       
        following        
        sentRequestToAddFriend     
        followed        
        receivedRequestToAddFriend        
        friends
      }
    }
  }
`;

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
        email
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