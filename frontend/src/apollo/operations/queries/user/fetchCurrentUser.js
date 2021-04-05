import { gql } from "@apollo/client";

export const FETCH_CURRENT_USER = gql`
  query{
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
