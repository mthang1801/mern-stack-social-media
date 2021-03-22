import {gql} from "@apollo/client";

export const GET_NOTIFICATIONS_PAGE_CACHE_DATA = gql`
  query{
    user @client
    notifications @client
  }
`