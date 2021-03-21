import {gql} from "@apollo/client";

export const GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN = gql`
  query {
    countNumberNotificationsUnseen @client
  }
`