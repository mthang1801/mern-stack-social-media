import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!
    fetchCurrentUser : User!
    fetchPosts(skip: Int, limit: Int) : [Post!]!       
    loginUser (data : LoginUserInput!) : UserAuthPayload!
    fetchNotifications(skip: Int, limit: Int) : [Notification!]
    countNotificationsUnseen : Int!
  }
`