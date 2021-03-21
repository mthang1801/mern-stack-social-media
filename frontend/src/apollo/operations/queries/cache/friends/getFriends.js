import {gql} from "@apollo/client";

export const GET_FRIENDS = gql`
  query {
    friends @client
  }
`