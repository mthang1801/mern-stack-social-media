import {gql} from "@apollo/client";

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