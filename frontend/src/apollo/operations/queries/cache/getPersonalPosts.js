import {gql} from "@apollo/client"

export const GET_PERSONAL_POSTS = gql`
  query {
    personalPosts @client
  }
`