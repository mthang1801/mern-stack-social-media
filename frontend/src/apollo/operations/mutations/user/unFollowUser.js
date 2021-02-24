import {gql} from "@apollo/client";

export const UNFOLLOW_USER = gql`
  mutation ($userId : ID!){
    unFollowUser(userId: $userId){
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