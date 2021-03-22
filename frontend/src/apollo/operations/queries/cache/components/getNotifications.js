import {gql} from "@apollo/client";

export const GET_NOTIFICATIONS_CACHE_DATA =gql`
  query{
    countNumberNotificationsUnseen @client
    openPopupNotification @clien
    newNotifications @clien
    notifications @client
    user @client
    currentPersonalUser @client
    receivedRequestsToAddFriend @client
    sentRequestsToAddFriend @client    
    friends @client
  }
`