import {gql} from "@apollo/client";

export const LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId: ID!){
    likeCommentSubscription(userId : $userId){
      _id 
      field
      content      
      url 
      hasSeen      
      creator{
        _id
        name
        avatar
        slug
      }
      fieldIdentity{
        post{
          _id
        }
        comment{
          _id
          shortenText
        }
      }
      receiver
      createdAt
      updatedAt
    }
  }
`