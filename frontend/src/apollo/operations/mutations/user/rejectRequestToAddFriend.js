import {gql} from "@apollo/client"

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
      }
      notification{
        _id
      }
    }
  }
`