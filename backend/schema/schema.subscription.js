import { gql } from "apollo-server-express";

export const schemaSubscription = gql`
  type Subscription {
    notifyCreatedPost(userId: ID!): SubscriptionNotificationPayload!
    notifyReceivedRequestToAddFriend(userId: ID!): SubscriptionNotificationPayload!
    notifyAcceptRequestToAddFriend(userId: ID!) : SubscriptionNotificationPayload!

    updateCountNotificationsWhenSeen(userId: ID!): ID!
    commentActions(postId: ID!): CommentSubscriptionPayload
    contactActions(userId: ID!): ContactSubscriptionPayload!
    privateChatActions(userId: ID!): PrivateChatSubsciptionPayload!
   
    rejectRequestToAddFriendSubscription(userId: ID!): UsersContact!
    cancelRequestToAddFriendSubscription(userId: ID!): UsersContact!
    removeFriendSubscription(userId: ID!) : UsersContact!
  }
`;

export const subscriptionActions = {
  NOTIFY_POST_CREATED: "NOTIFY_POST_CREATED",
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND: "NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND",
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND : "NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND",
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN: "UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN",
  REJECT_REQUEST_TO_ADD_FRIEND: "REJECT_REQUEST_TO_ADD_FRIEND",
  CANCEL_REQUEST_TO_ADD_FRIEND : "CANCEL_REQUEST_TO_ADD_FRIEND",
  REMOVE_FRIEND : "REMOVE_FRIEND",
  COMMENT_ACTIONS: "COMMENT_ACTIONS",
  CONTACT_ACTIONS: "CONTACT_ACTIONS",
  PRIVATE_CHAT_ACTIONS: "PRIVATE_CHAT_ACTIONS",
};
