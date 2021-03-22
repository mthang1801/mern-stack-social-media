import { gql } from "@apollo/client";

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
      notifications{
        _id
        field
        action
        hasSeen
        creator{
          _id
          name 
          avatar
        }
        href 
        acceptInvite        
        createdAt
      }    
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
