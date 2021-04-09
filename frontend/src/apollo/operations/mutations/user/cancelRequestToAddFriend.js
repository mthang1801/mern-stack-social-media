import {gql} from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($receiverId: ID!){
    cancelRequestToAddFriend(receiverId : $receiverId){
      sender {
        _id
        slug
        following        
        friends
        sentRequestToAddFriend                
      }
      receiver {
        _id
        slug        
        followed        
        friends
        receivedRequestToAddFriend        
      }
    }
  }
`