import {gql} from "@apollo/client"

export const GET_POPUP_NOTIFICATION_CACHE_DATA = gql`
  query{
    latestNotification @client
  }
`