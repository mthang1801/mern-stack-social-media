import {gql} from "@apollo/client"

export const REJECT_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($userId : ID!){
    rejectRequestToAddFriend(userId : $userId)
  }
`