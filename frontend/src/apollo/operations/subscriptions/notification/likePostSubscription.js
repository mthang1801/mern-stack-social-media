import { gql } from "@apollo/client";

export const LIKE_POST_SUBSCRIPTION = gql`
subscription($userId : ID!){
  likePostSubscription(userId : $userId){
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
    receiver
    isQuestion
    createdAt
    updatedAt
  }
}
`;
