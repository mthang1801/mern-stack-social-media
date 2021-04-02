import {gql} from "@apollo/client";

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!){
    likeComment(commentId: $commentId)
  }
`

