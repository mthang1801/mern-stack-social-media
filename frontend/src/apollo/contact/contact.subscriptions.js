import {gql} from "@apollo/client"

export const REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
subscription($userId: ID!) {
  rejectRequestToAddFriendSubscription(userId: $userId) {
    sender {
      _id
      slug       
      friends
      following        
      sentRequestToAddFriend      
      followed        
      receivedRequestToAddFriend   
      notifications
    }
    receiver {
      _id
      slug    
      friends   
      following        
      sentRequestToAddFriend   
      followed        
      receivedRequestToAddFriend       
      notifications 
    }  
  }
}
`;


export const REMOVE_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId : ID!){
    removeFriendSubscription(userId: $userId){
      sender {
        _id
        slug
        name        
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
        notifications
      }
      receiver {
        _id
        slug
        name        
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
        notifications
      }
      notification{
        _id             
      }
    }
  }
`