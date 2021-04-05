import { POST_CREATED_SUBSCRIPTIONS } from "./postCreated";
import { UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION } from "./updateCountNotificationsWhenSeen";
import { NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND } from "./notifyReceivedRequestToAddFriend";
import { NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND } from "./notifyAcceptRequestToAddFriend";
import { NOTIFY_MENTION_USERS_IN_POST } from "./notifyMentionUsersInPost";
import { LIKE_POST_SUBSCRIPTION } from "./likePostSubscription";
import { REMOVE_LIKE_POST_SUBSCRIPTION } from "./removeLikePostSubscription";
import { NOTIFY_MENTION_USERS_IN_COMMENT_SUBSCRIPTION } from "./notifyMentionUsersInComment";
import { NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION } from "./notifyUserCommentPostSubscription";
const notificationSubscription = {
  POST_CREATED_SUBSCRIPTIONS,
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION,
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND,
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND,
  NOTIFY_MENTION_USERS_IN_POST,
  LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
  NOTIFY_MENTION_USERS_IN_COMMENT_SUBSCRIPTION,
  NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
};

export default notificationSubscription;
