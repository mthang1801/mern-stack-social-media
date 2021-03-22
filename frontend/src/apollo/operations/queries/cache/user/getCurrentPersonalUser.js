import {gql} from "@apollo/client"

export const GET_CURRENT_PERSONAL_USER = gql`
  query {
    currentPersonalUser @client
  }
`