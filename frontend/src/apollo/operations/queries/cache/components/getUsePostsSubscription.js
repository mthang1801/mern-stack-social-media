import {gql} from "@apollo/client";

export const GET_USE_POST_SUBSCRIPTION_CACHE_DATA = gql`
  query{
    user @client
    personalPosts @client
  }
`
