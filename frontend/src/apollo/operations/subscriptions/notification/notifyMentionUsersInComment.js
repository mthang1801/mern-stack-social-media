import {gql} from "@apollo/client";

export const NOTIFY_MENTION_USERS_IN_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId : ID!){
    notifyMentionUsersInComment(userId: $userId){
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
        slug
      }
      createdAt
    }
  }
`