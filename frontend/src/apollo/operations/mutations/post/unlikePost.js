import {gql} from "@apollo/client";

export const UNLIKE_POST = gql`
  mutation ($postId: ID!){
    unlikePost(postId : $postId)
  }
`