import { POST_CREATED_SUBSCRIPTIONS } from "./postCreated";
import { UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION } from "./updateCountNotificationsWhenSeen";
import { NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND } from "./notifyReceivedRequestToAddFriend";
import { NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND } from "./notifyAcceptRequestToAddFriend";
import { NOTIFY_MENTION_USERS_IN_POST } from "./notifyMentionUsersInPost"
import { NOTIFY_USER_LIKE_POST_SUBSCRIPTION } from "./notifyUserLikePost"
const notificationSubscription = {
  POST_CREATED_SUBSCRIPTIONS,
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION,
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND,
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND,
  NOTIFY_MENTION_USERS_IN_POST,
  NOTIFY_USER_LIKE_POST_SUBSCRIPTION
};

export default notificationSubscription;
