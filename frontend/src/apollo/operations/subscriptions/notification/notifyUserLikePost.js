import {gql} from "@apollo/client";

export const NOTIFY_USER_LIKE_POST_SUBSCRIPTION = gql`
subscription($userId : ID!){
  notifyUserLikePost(userId : $userId){
    post{
      _id      
    }
    notification{
      _id
      receivers
      action
      field
      href
      creator {
        _id
        name
        avatar
        slug
        isOnline
      }
      hasSeen
      createdAt
    }
  }
}
`