import {gql} from "@apollo/client";

export const GET_POST_STATUS = gql`
  query GetPostStatus{
    postStatus @client
  }
`
