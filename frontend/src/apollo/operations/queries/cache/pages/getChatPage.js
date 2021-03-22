import {gql} from "@apollo/client"

export const GET_CHAT_PAGE_CACHE_DATA = gql`
  query{
    user @client
    messagesStorage @client
  }
`