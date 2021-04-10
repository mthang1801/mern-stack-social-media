import {gql} from "@apollo/client";

export const NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND = gql`
  subscription ($userId: ID!){
    acceptRequestToAddFriendSubscription(userId: $userId){
      action
      field   
      sender{
        _id
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
        content
        hasSeen
        creator {
          _id
          name
          avatar
        }
        url
        isQuestion
        createdAt
        updatedAt
      }
    }
  }
`