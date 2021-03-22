import {gql} from "@apollo/client";

export const GET_CHAT_CACHE_DATA =gql`
  query{
    user @client
    currentChat @client
    messagesStorage @client
  }
`