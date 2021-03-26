import {gql} from "@apollo/client";

export const GET_HEADER_CACHE_DATA = gql`
  query {
    countNumberNotificationsUnseen @client
    notifications @client    
    user @client
  }
`