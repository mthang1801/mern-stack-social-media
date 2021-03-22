import {gql} from "@apollo/client";

export const GET_LIST_CONVERSATIONS_CACHE_DATA = gql`
  query{
    user @client
    currentChat @client
    messagesStorage @client
    numberOfConversations @client
  }
`