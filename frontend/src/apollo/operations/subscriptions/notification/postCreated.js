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
      content
      hasSeen
      creator {
        _id
        name
        avatar
      }
      url
      isQuestion
      createdAt 
    }
  }
}
`