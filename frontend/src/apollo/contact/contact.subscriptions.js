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
    }
    receiver {
      _id
      slug    
      friends   
      following        
      sentRequestToAddFriend   
      followed        
      receivedRequestToAddFriend        
    }
    notification{
      _id
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
      }
      notification{
        _id
        field
        content
        hasSeen
        isQuestion
        url
        questionType{
          yesNoQuestion
        }
        fieldIdentity {
          sender {
            _id
            name
            slug
            following
            followed
            friends
            sentRequestToAddFriend
            receivedRequestToAddFriend
          }
          receiver {
            _id
            name
            slug
            following
            followed
            friends
            receivedRequestToAddFriend
            sentRequestToAddFriend
            notifications
          }
        }
        creator {
          _id
          name
          slug
          avatar
        }
        receiver
        updatedAt
        createdAt     
      }
    }
  }
`