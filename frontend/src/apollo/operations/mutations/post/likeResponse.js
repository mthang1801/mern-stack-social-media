import {gql} from "@apollo/client";

export const LIKE_RESPONSE = gql`
  mutation LikeResponse($responseId : ID!){
    likeResponse(responseId : $responseId)
  }
`