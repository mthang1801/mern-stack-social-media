import {gql} from "@apollo/client";

export const GET_MESSAGES_STORAGE = gql`
  query{
    messagesStorage @client
  }
`