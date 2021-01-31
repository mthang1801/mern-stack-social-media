import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!
    posts(query : String) : [Post!]!
    loginUser (data : LoginUserInput!) : UserAuthPayload!
  }
`