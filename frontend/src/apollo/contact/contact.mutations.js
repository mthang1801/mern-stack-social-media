import { gql } from "@apollo/client";

export const ACCEPT_REQUEST_TO_ADD_FRIEND = gql`
  mutation($senderId: ID!) {
    acceptRequestToAddFriend(senderId: $senderId) {
      sender {
        _id      
        name                          
        slug
        email
        avatar
        following
        followed        
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
      }
      receiver {
        _id
        name                          
        slug
        email 
        avatar
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
        friends
        notifications
      }
      notification {
        _id
        field
        content
        hasSeen
        isQuestion
        url
        fieldIdentity {
          sender {
            _id
            name
            slug
            email
            avatar
            isOnline
            offlinedAt
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
            email
            avatar
            isOnline
            offlinedAt
            following
            followed
            friends
            sentRequestToAddFriend
            receivedRequestToAddFriend
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
`;



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
        notifications
      }
      notification{
         _id
        field
        content
        hasSeen
        isQuestion
        url
        fieldIdentity {
          sender {
            _id
            name
            slug
            email
            avatar
            isOnline
            offlinedAt
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
            email
            avatar
            isOnline
            offlinedAt
            following
            followed
            friends
            sentRequestToAddFriend
            receivedRequestToAddFriend
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

