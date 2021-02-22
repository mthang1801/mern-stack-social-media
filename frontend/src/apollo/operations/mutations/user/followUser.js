import {gql} from "@apollo/client"

export const FOLLOW_USER =  gql`
  mutation ($userId : ID!){ 
    followUser(userId: $userId)
  }
`