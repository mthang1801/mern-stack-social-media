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
  }
`;