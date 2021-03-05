import {gql} from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($receiverId: ID!){
    cancelRequestToAddFriend(receiverId : $receiverId){
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
    }
  }
`