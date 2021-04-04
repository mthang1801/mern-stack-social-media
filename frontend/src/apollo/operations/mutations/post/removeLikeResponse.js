import {gql} from "@apollo/client";

export const REMOVE_LIKE_RESPONSE = gql`
  mutation RemoveLikeResponse($responseId: ID!){
    removeLikeResponse(responseId : $responseId) 
  }
`