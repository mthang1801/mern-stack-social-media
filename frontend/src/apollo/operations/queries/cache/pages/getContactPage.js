import {gql} from "@apollo/client"

export const GET_CONTACT_PAGE_CACHE_DATA = gql`
  query{
    user @client
    friends @client
    sentRequestsToAddFriend @client
    receivedRequestsToAddFriend @client
  }
`