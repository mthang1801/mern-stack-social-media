import {gql} from "@apollo/client";

export const GET_PERSONAL_PAGE_CACHE_DATA = gql`
  query{
    currentPersonalUser @client
    personalPosts @client
  }
`