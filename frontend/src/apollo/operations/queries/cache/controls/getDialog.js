import {gql} from "@apollo/client";

export const GET_DIALOG = gql`
  query GetDialog{
    dialog @client
  }
`