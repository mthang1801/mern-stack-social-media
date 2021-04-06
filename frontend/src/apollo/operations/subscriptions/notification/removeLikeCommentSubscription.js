import {gql} from "@apollo/client";

export const REMOVE_LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId: ID!){
    removeLikeCommentSubscription(userId: $userId){
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
        post {
          _id
        }
        comment{
          _id          
        }
      }
      createdAt
      updatedAt
    }
  }
`