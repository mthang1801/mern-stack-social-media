import {gql} from "@apollo/client";

export const GET_NEW_NOTIFICATIONS = gql`
  query {
    newNotifications @client
  }
`