import {gql} from "@apollo/client";

export const LIKE_POST = gql`
  mutation ($postId : ID!){
    likePost(postId : $postId)
  } 
`