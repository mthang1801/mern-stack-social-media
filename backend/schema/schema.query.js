import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!    
    fetchCurrentUser : User!
    fetchPersonalUser(slug : String!) : User
    fetchPosts(skip: Int, limit: Int, userId: ID) : [Post!]!       
    fetchFriends(skip: Int, limit : Int, userId: ID) : [User!]!
    loginUser (data : LoginUserInput!) : UserAuthPayload!
    fetchNotifications(skip: Int, limit: Int) : [Notification!]
    countNotificationsUnseen : Int!
  }
`