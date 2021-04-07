import {gql} from "@apollo/client";

export const NOTIFY_MENTIONED_USERS_IN_RESPONSE = gql`
  subscription ($userId: ID!){
    notifyMentionedUsersInResponse(userId : $userId){
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