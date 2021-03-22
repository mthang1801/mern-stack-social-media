import {gql} from "@apollo/client"

export const FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN = gql`
  query {
    countNotificationsUnseen
  }
`