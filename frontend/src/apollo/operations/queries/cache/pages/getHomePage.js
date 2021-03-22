import {gql} from "@apollo/client";

export const GET_HOME_PAGE_CACHE_DATA = gql`
  query {
    user @client 
    posts @client    
    openFriendsList @client
  }
`