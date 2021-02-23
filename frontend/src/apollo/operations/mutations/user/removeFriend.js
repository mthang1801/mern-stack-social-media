import {gql} from "@apollo/client";

export const REMOVE_FRIEND = gql`
  mutation ($friendId : ID!){
    removeFriend(friendId : $friendId){
      sender {
        _id
        slug
        following
        followed
        sendRequestToAddFriend
        receiveRequestToAddFriend
        friends
      }
      receiver {
        _id
        slug
        following
        followed
        sendRequestToAddFriend
        receiveRequestToAddFriend
        friends
      }
    }
  }
`