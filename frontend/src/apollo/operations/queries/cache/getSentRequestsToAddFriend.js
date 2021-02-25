import {gql} from "@apollo/client";

export const GET_SENT_REQUESTS_TO_ADD_FRIEND = gql`
  query {
    sentRequestsToAddFriend @client
  }
`