import { gql } from "@apollo/client";

export const NOTIFY_USER_LIKE_POST_SUBSCRIPTION = gql`
subscription($userId : ID!){
  notifyUserLikePost(userId : $userId){
    _id
    field
    content
    creator{
      _id
      name 
      avatar
      slug
    }
    fieldIdentity{
      post{
        _id        
        shortenText
      }
    }
    url
    hasSeen
    receivers
    isQuestion
    createdAt
  }
}
`;
