import {gql} from "@apollo/client"

export const COUNT_NOTIFICATIONS_UNSEEN = gql`
  query {
    countNotificationsUnseen
  }
`