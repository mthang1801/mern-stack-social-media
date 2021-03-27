import {gql} from "@apollo/client"

export const GET_LATEST_NOTIFICATION = gql`
  query {
    latestNotification @client
  }
`