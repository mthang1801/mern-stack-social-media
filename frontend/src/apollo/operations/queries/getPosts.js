import {gql} from "@apollo/client"

export const GET_POSTS = gql`
  query GetPosts{
    _id 
    title
    content
    status
    author{
      _id
      email
    }
    status
    createdAt
    updatedAt
  }
`