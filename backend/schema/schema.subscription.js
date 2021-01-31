import {gql} from "apollo-server-express";

export const schemaSubscription = gql`
  type Subscription{
    postActions(userId : ID!): PostSubscriptionPayload
    commentActions(postId : ID!) : CommentSubscriptionPayload
    contactActions(userId: ID!) : ContactSubscriptionPayload!    
    privateChatActions(userId: ID!) : PrivateChatSubsciptionPayload!
  }
`

export const subscriptionActions = {
  POST_ACTIONS : "POST_ACTIONS",
  COMMENT_ACTIONS : "COMMENT_ACTIONS",
  CONTACT_ACTIONS : "CONTACT_ACTIONS",
  PRIVATE_CHAT_ACTIONS : "PRIVATE_CHAT_ACTIONS"
}