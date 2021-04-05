import {gql} from "@apollo/client";

export const REMOVE_LIKE_POST = gql`
  mutation ($postId: ID!){
    removeLikePost(postId : $postId)
  }
`