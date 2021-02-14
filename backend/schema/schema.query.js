import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!
    fetchCurrentUser : User!
    fetchPosts(limit: Int, skip: Int) : [Post!]!       
    loginUser (data : LoginUserInput!) : UserAuthPayload!
    fetchNotifications : [Notification!]
  }
`