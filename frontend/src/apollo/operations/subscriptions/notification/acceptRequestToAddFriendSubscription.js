import {gql} from "@apollo/client";


export const ACCEPT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId : ID!){
    acceptRequestToAddFriendSubscription(userId : $userId){
      _id
      field
      content
      hasSeen
      isQuestion
      url
      fieldIdentity {
        sender {
          _id          
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
        }
        receiver {
          _id          
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
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
`