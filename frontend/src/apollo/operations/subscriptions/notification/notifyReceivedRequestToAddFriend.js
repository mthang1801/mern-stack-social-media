import {gql} from "@apollo/client"

export const NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND = gql`
subscription ($userId : ID!){
  notifyReceivedRequestToAddFriend(userId : $userId){
    field
    action
    sender{
      _id
      name
      avatar
      slug
      friends
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
    receiver{
      _id
      name
      avatar
      slug
      friends
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
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