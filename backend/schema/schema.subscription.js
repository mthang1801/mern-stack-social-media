import { gql } from "apollo-server-express";

export const schemaSubscription = gql`
  type Subscription {
    notifyCreatedPost(userId: ID!): SubscriptionNotificationPayload!
    notifyMentionUsersInPost(userId: ID!) : Notification!
    notifyUserLikePost(userId: ID!) : NotificationPayload!
    notifyMentionUsersInComment(userId : ID!) : Notification!
    notifyOwnerPostUserComment(userId: ID!): CommentSubscriptionPayload!
    notifyOwnerCommentUserLike(userId : ID!) : Notification!
    notifyReceivedRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!
    notifyAcceptRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!

    updateCountNotificationsWhenSeen(userId: ID!): ID!
    commentActions(postId: ID!): CommentSubscriptionPayload
    contactActions(userId: ID!): ContactSubscriptionPayload!

    rejectRequestToAddFriendSubscription(userId: ID!): UsersContact!
    cancelRequestToAddFriendSubscription(userId: ID!): UsersContact!
    removeFriendSubscription(userId: ID!): UsersContact!

    sentMessageChatSubscription(userId: ID!): ChatSubscriptionPayload!
    notifySenderThatReceiverHasReceivedMessageChat(
      userId: ID!
    ): ChatSubscriptionPayload!
    senderSubscribeWhenReceiverHasSeenAllMessages(
      userId: ID!
    ): SeenAllMessagesSubscriptionPayload!
    notifySendersThatReceiverOnlineHasReceivedMessagesChat(userId: ID!): ListSendersConversationsPayload!    
  }
`;

export const subscriptionActions = {
  NOTIFY_POST_CREATED: "NOTIFY_POST_CREATED",
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND:
    "NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND",
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND: "NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND",
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN: "UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN",
  REJECT_REQUEST_TO_ADD_FRIEND: "REJECT_REQUEST_TO_ADD_FRIEND",
  CANCEL_REQUEST_TO_ADD_FRIEND: "CANCEL_REQUEST_TO_ADD_FRIEND",
  REMOVE_FRIEND: "REMOVE_FRIEND",
  COMMENT_ACTIONS: "COMMENT_ACTIONS",
  CONTACT_ACTIONS: "CONTACT_ACTIONS",
  SENT_CHAT: "SENT_CHAT",
  UPDATE_RECEIVER_RECEIVED_CHAT: "UPDATE_RECEIVER_RECEIVED_CHAT", //Change Sent to Delivered
  UPDATE_RECEIVER_SEEN_ALL_MESSAGES: "UPDATE_RECEIVER_SEEN_ALL_MESSAGES",
  UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE:
    "UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE",
  NOTIFY_MENTION_USERS_IN_POST : "NOTIFY_MENTION_USERS_IN_POST",
  NOTIFY_OWNER_POST_USER_LIKE_POST : "NOTIFY_OWNER_POST_USER_LIKE_POST",
  NOTIFY_MENTIONS_USERS_IN_COMMENT : "NOTIFY_MENTIONS_USERS_IN_COMMENT",
  NOTIFY_OWNER_POST_USER_COMMENT : "NOTIFY_OWNER_POST_USER_COMMENT",
  NOTIFY_OWNER_COMMENT_USER_LIKE : "NOTIFY_OWNER_COMMENT_USER_LIKE"
};
