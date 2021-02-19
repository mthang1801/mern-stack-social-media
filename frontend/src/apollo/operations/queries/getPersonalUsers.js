import {gql} from "@apollo/client"

export const GET_PERSONAL_USERS = gql`
  query {
    personalUsers @client
  }
`