import {gql} from "@apollo/client";

export const NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND = gql`
  subscription ($userId: ID!){
    notifyAcceptRequestToAddFriend(userId: $userId){
      action
      field   
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
        href 
        hasSeen
        acceptInvite
        creator{
          _id
          name
          avatar
          slug
        }
        createdAt
      }
    }
  }
`