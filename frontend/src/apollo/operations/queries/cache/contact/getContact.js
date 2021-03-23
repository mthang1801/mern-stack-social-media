import {gql} from "@apollo/client"

export const GET_CONTACT_CACHE_DATA = gql`
  query{
    user @client
    friends @client
    currentPersonalUser @client
    receivedRequestsToAddFriend @client
  }
`