import {gql} from "@apollo/client"

export const GET_RECEIVED_REQUESTS_TO_ADD_FRIEND = gql`
  query {
    receivedRequestsToAddFriend @client
  }
`