import {gql} from "apollo-server-express"

export const schemaQuery = gql`
  type Query {
    users : [User!]!    
    fetchCurrentUser : User!
    fetchPersonalUser(slug : String!) : User
    fetchPosts(userId: ID,skip: Int, limit: Int) : [Post!]!    
    fetchComments(postId: ID!, except : [ID!], skip: Int, limit: Int) : [Comment!]
    fetchResponses(commentId : ID!, skip : Int, limit: Int) : [Response!]
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
    searchFriends(search: String!) : [User!]
  }
`