import { gql } from 'apollo-server-express';

export const schemaSubscription = gql`
  type Subscription {
    notifyMentionedUsersInPost(userId: ID!): Notification!
    likePostSubscriptionNotification: Notification!
    removeLikePostSubscription: Notification!
    editPostSubscription: Post!

    notifyUserCommentPostSubscription(userId: ID!): Notification!
    notifyMentionUsersInComment(userId: ID!): Notification!
    createCommentSubscription: Comment!
    likeCommentSubscription: CommentSubscriptionPayload!
    removeLikeCommentSubscription: CommentSubscriptionPayload!

    notifyUserResponseCommentSubscription(userId: ID!): Notification!
    notifyMentionedUsersInResponse(userId: ID!): Notification!
    createResponseSubscription: Response!
    likeResponseSubscription: Notification!
    removeLikeResponseSubscription: Notification!
    removeMentionedNotificationSubscription(userId: ID!): Notification!

    notifyReceivedRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!
    notifyAcceptRequestToAddFriend(
      userId: ID!
    ): SubscriptionNotificationPayload!

    sentRequestToAddFriendSubscription(userId: ID!): Notification!
    cancelRequestToAddFriendSubscription(userId: ID!): Notification!
    rejectRequestToAddFriendSubscription(userId: ID!): UsersContact!
    acceptRequestToAddFriendSubscription(userId: ID!): Notification!
    removeFriendSubscription(userId: ID!): UsersContact!

    commentActions(postId: ID!): CommentSubscriptionPayload
    contactActions(userId: ID!): ContactSubscriptionPayload!

    sentMessageChatSubscription(userId: ID!): ChatSubscriptionPayload!
    notifySenderThatReceiverHasReceivedMessageChat(
      userId: ID!
    ): ChatSubscriptionPayload!
    senderSubscribeWhenReceiverHasSeenAllMessages(
      userId: ID!
    ): SeenAllMessagesSubscriptionPayload!
    notifySendersThatReceiverOnlineHasReceivedMessagesChat(
      userId: ID!
    ): ListSendersConversationsPayload!
  }
`;

export const subscriptionActions = {
  SEND_REQUEST_TO_ADD_FRIEND: 'SEND_REQUEST_TO_ADD_FRIEND',
  CANCEL_REQUEST_TO_ADD_FRIEND: 'CANCEL_REQUEST_TO_ADD_FRIEND',
  REJECT_REQUEST_TO_ADD_FRIEND: 'REJECT_REQUEST_TO_ADD_FRIEND',
  ACCEPT_REQUEST_TO_ADD_FRIEND: 'ACCEPT_REQUEST_TO_ADD_FRIEND',
  REMOVE_FRIEND: 'REMOVE_FRIEND',

  EDIT_POST_SUBSCRIPTION: 'EDIT_POST_SUBSCRIPTION',
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN: 'UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN',
  COMMENT_ACTIONS: 'COMMENT_ACTIONS',
  CONTACT_ACTIONS: 'CONTACT_ACTIONS',
  SENT_CHAT: 'SENT_CHAT',
  UPDATE_RECEIVER_RECEIVED_CHAT: 'UPDATE_RECEIVER_RECEIVED_CHAT', //Change Sent to Delivered
  UPDATE_RECEIVER_SEEN_ALL_MESSAGES: 'UPDATE_RECEIVER_SEEN_ALL_MESSAGES',
  UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE:
    'UPDATE_RECEIVER_ONLINE_RECEIVED_ALL_MESSAGE',
  NOTIFY_MENTIONED_USERS_IN_POST: 'NOTIFY_MENTIONED_USERS_IN_POST',
  LIKE_POST_SUBSCRIPTION_NOTIFICATION: 'LIKE_POST_SUBSCRIPTION_NOTIFICATION',
  NOTIFY_USER_COMMENT_POST_SUBSCRIPTION:
    'NOTIFY_USER_COMMENT_POST_SUBSCRIPTION',
  REMOVE_LIKE_POST_SUBSCRIPTION: 'REMOVE_LIKE_POST_SUBSCRIPTION',
  NOTIFY_MENTIONED_USERS_IN_COMMENT: 'NOTIFY_MENTIONED_USERS_IN_COMMENT',
  LIKE_COMMENT_SUBSCRIPTION: 'LIKE_COMMENT_SUBSCRIPTION',
  REMOVE_LIKE_COMMENT_SUBSCRIPTION: 'REMOVE_LIKE_COMMENT_SUBSCRIPTION',
  CREATE_COMMENT_SUBSCIPTION: 'CREATE_COMMENT_SUBSCIPTION',
  NOTIFY_USER_RESPONSE_COMMENT: 'NOTIFY_USER_RESPONSE_COMMENT',
  NOTIFY_MENTIONED_USERS_IN_RESPONSE: 'NOTIFY_MENTIONED_USERS_IN_RESPONSE',
  CREATE_RESPONSE_SUBSCRIPTION: 'CREATE_RESPONSE_SUBSCRIPTION',
  LIKE_RESPONSE_SUBSCRIPTION: 'LIKE_RESPONSE_SUBSCRIPTION',
  REMOVE_LIKE_RESPONSE_SUBSCRIPTION: 'REMOVE_LIKE_RESPONSE_SUBSCRIPTION',
  REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST:
    'REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST',
};
