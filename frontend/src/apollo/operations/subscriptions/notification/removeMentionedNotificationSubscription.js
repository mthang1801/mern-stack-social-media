import {gql} from "@apollo/client"

export const REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST = gql`
  subscription ($userId : ID!){
    removeMentionedNotificationSubscription(userId : $userId){
      _id 
      receiver
    }
  }
`