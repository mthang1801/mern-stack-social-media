import { gql } from "@apollo/client";

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
