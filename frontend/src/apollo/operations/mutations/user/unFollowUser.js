import {gql} from "@apollo/client";

export const UNFOLLOW_USER = gql`
  mutation ($userId : ID!){
    unFollowUser(userId: $userId)
  }
`