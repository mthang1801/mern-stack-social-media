import {gql} from "@apollo/client";

export const UPDATE_USER_HAS_SEEN_NOTIFICATION = gql`
  mutation UpdateUserHasSeenNotification($notificationId : ID!){ 
    updateUserHasSeenNotification(notificationId : $notificationId){
      _id
      field
      action
      hasSeen
      creator {
        _id
        name
        avatar
      }
      href
      acceptInvite
      createdAt
    }
  }
`
