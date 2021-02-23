import {gql} from "@apollo/client"

export const NOTIFY_RECEIVE_REQUEST_TO_ADD_FRIEND = gql`
subscription ($userId : ID!){
  notifyReceiveRequestToAddFriend(userId : $userId){
    field
    action
    sender{
      _id
      avatar
      slug
      friends
      following
      followed
      sendRequestToAddFriend
      receiveRequestToAddFriend
    }
    receiver{
      _id
      avatar
      slug
      friends
      following
      followed
      sendRequestToAddFriend
      receiveRequestToAddFriend
    }
    receivers
    notification{
      _id
      field
      action
      hasSeen      
      acceptInvite
      href
      creator{
        _id
        name
        email
        avatar
        slug
      }
      createdAt    
    }
  }
}
`