import {gql} from "@apollo/client";

export const GET_FRIENDS_BY_ALPHABETA = gql`
  query{
    friendsByAlphabeta @client
  }
`