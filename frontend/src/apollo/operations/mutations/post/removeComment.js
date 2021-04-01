import {gql} from "@apollo/client";

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId : ID!){
    removeComment(commentId: $commentId)
  }
`