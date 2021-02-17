import {gql} from "@apollo/client"

export const GET_LOADING_NOTIFICATIONS_MORE = gql`
  query {
    loadingNotificationsMore @client
  }
`