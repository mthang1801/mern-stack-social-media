import {gql} from "@apollo/client";

export const GET_HOME_CACHE_DATA = gql`
  query{
    user @client
    posts @client
    openFriendsList @client
  }
`