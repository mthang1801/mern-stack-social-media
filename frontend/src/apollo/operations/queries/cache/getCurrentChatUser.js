import {gql} from "@apollo/client";

export const GET_CURRENT_CHAT_USER = gql`
  query{
    currentChatUser @client
  }
`