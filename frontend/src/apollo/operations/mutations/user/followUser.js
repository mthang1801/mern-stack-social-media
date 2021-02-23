import {gql} from "@apollo/client"

export const FOLLOW_USER =  gql`
  mutation ($userId : ID!){ 
    followUser(userId: $userId){
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