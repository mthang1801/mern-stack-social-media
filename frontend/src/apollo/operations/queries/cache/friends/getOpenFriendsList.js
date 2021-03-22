import {gql} from "@apollo/client";

export const GET_OPEN_FRIENDS_LIST = gql`
  query {
    openFriendsList @client
  }
`