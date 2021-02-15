import {gql} from "@apollo/client";

export const POST_CREATED_SUBSCRIPTIONS = gql`
subscription NotifyCreatedPost($userId : ID!){
  notifyCreatedPost(userId : $userId){
    action
    type    
    users 
    notification{
      _id 
      field
      action
      href 
      hasSeen
      acceptInvite
      creator{
        _id
        name
        avatar
      }
      createdAt
    }
  }
}
`