import {gql} from "@apollo/client";

export const REMOVE_FRIEND = gql`
  subscription ($userId : ID!){
    removeFriendSubscription(userId: $userId){
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