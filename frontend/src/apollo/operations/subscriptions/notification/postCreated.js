import {gql} from "@apollo/client";

export const POST_CREATED_SUBSCRIPTIONS = gql`
subscription NotifyCreatedPost($userId : ID!){
  notifyCreatedPost(userId : $userId){
    field
    action
    sender{
      _id
      avatar
      slug
      friends
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
    receivers
    notification{
      _id
      field
      action
      hasSeen     
      href 
      acceptInvite
      creator{
        _id
        name
        email
        avatar
        slug
      }
      createdAt    
    }
  }
}
`