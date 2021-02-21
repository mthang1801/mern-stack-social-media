import { gql } from "apollo-server-express";

export const schemaSubscription = gql`
  type Subscription {
    notifyCreatedPost(userId: ID!): SubscriptionNotificationPayload!
    updateCountNotificationsWhenSeen(userId: ID!): ID!
    commentActions(postId: ID!): CommentSubscriptionPayload
    contactActions(userId: ID!): ContactSubscriptionPayload!
    privateChatActions(userId: ID!): PrivateChatSubsciptionPayload!
    notifyReceiveAddFriend(userId: ID!): SubscriptionNotificationPayload!
    rejectRequestToAddFriendSubscription(userId: ID!): UsersContact!
  }
`;

export const subscriptionActions = {
  NOTIFY_POST_CREATED: "NOTIFY_POST_CREATED",
  NOTIFY_RECEIVE_ADD_FRIEND: "NOTIFY_RECEIVE_ADD_FRIEND",
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN: "UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN",
  REJECT_REQUEST_TO_ADD_FRIEND: "REJECT_REQUEST_TO_ADD_FRIEND",
  COMMENT_ACTIONS: "COMMENT_ACTIONS",
  CONTACT_ACTIONS: "CONTACT_ACTIONS",
  PRIVATE_CHAT_ACTIONS: "PRIVATE_CHAT_ACTIONS",
};
