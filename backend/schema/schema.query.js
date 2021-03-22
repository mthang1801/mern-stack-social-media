import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!    
    fetchCurrentUser : User!
    fetchPersonalUser(slug : String!) : User
    fetchPosts(skip: Int, limit: Int, userId: ID) : [Post!]!       
    fetchFriends(skip: Int, limit : Int, userId: ID) : [User!]!
    fetchListContact: ListContact!    
    fetchUsersSentRequestToAddFriend(skip : Int, limit: Int) : [User!]!
    fetchUsersReceivedRequestToAddFriend(skip: Int, limit: Int): [User!]!
    fetchChatConversations( except : [ID!], skip: Int, limit : Int) : ConversationsResult    
    fetchMessages(conversationId : ID!, scope: String!, skip: Int!, limit: Int!) : MessagesResult! 
    fetchSingleChatConversation(conversationId : ID!, scope: String!) : Conversation
    loginUser (data : LoginUserInput!) : UserAuthPayload!
    fetchNotifications(skip: Int, limit: Int) : [Notification!]
    countNotificationsUnseen : Int!
  }
`