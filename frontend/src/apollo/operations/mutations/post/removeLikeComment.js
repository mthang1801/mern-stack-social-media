import {gql} from "@apollo/client";

export const REMOVE_LIKE_COMMENT = gql`
  mutation RemoveLikeComment($commentId : ID!){
    removeLikeComment(commentId : $commentId)
  }
`