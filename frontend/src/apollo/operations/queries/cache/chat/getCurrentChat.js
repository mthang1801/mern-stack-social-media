import {gql} from "@apollo/client";

export const GET_CURRENT_CHAT = gql`
  query{
    currentChat @client
  }
`