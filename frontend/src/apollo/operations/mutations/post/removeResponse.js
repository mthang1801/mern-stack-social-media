import {gql} from "@apollo/client"

export const REMOVE_RESPONSE = gql`
  mutation RemoveResponse($responseId : ID!){
    removeResponse(responseId : $responseId)
  }
`