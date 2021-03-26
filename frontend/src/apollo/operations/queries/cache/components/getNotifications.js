import {gql} from "@apollo/client";

export const GET_NOTIFICATIONS_CACHE_DATA = gql`
  query {
    notifications @client
    user @client
    countNumberNotificationsUnseen @client    
    currentPersonalUser @client
    receivedRequestsToAddFriend @client
  }
`