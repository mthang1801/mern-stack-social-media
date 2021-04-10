import { gql } from "@apollo/client";

export const ACCEPT_REQUEST_TO_ADD_FRIEND = gql`
  mutation($senderId: ID!) {
    acceptRequestToAddFriend(senderId: $senderId) {
      sender {
        _id
        slug
        following        
        sentRequestToAddFriend        
        friends
      }
      receiver {
        _id
        slug        
        followed        
        receivedRequestToAddFriend
        friends
      }
      notification { 
        _id
      }
    }
  }
`;
