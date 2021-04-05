import {gql} from "@apollo/client";

export const UPDATE_USER_HAS_SEEN_NOTIFICATION = gql`
  mutation UpdateUserHasSeenNotification($notificationId : ID!){ 
    updateUserHasSeenNotification(notificationId : $notificationId){
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
`
