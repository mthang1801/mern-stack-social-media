import {gql} from "@apollo/client";

export const NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId: ID!){
    notifyUserResponseCommentSubscription(userId : $userId){     
      _id 
      field
      content
      url 
      hasSeen
      isQuestion
      creator{
        _id
        name
        avatar
        slug
      }
      fieldIdentity{
        post {
          _id
          shortenText
        }
        comment{
          _id 
          shortenText
        }
      }
      createdAt
      updatedAt
    }
  }
`