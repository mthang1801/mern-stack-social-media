import { gql } from "apollo-server-express";

export const schemaSubscription = gql`
  type Subscription {    
    notifyMentionUsersInPost(userId: ID!) : Notification!
    likePostSubscription(userId: ID!) : Notification!
    removeLikePostSubscription(userId: ID!) : Notification!
    notifyUserCommentPostSubscription(userId: ID!): CommentSubscriptionPayload!
    notifyMentionUsersInComment(userId : ID!) : Notification!
    
    likeCommentSubscription(userId : ID!) : Notification!
    removeLikeCommentSubscription(userId: ID!) : Notification!
    notifyReceivedRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!
    notifyAcceptRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!

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
  NOTIFY_MENTIONED_USERS_IN_POST : "NOTIFY_MENTIONED_USERS_IN_POST",
  LIKE_POST_SUBSCRIPTION : "LIKE_POST_SUBSCRIPTION",
  NOTIFY_USER_COMMENT_POST_SUBSCRIPTION : "NOTIFY_USER_COMMENT_POST_SUBSCRIPTION",
  REMOVE_LIKE_POST_SUBSCRIPTION : "REMOVE_LIKE_POST_SUBSCRIPTION",
  NOTIFY_MENTIONED_USERS_IN_COMMENT : "NOTIFY_MENTIONED_USERS_IN_COMMENT",  
  LIKE_COMMENT_SUBSCRIPTION : "LIKE_COMMENT_SUBSCRIPTION",
  REMOVE_LIKE_COMMENT_SUBSCRIPTION : "REMOVE_LIKE_COMMENT_SUBSCRIPTION"
};
