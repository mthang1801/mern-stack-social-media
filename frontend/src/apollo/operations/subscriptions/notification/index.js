import { POST_CREATED_SUBSCRIPTIONS } from "./postCreated";
import { UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION } from "./updateCountNotificationsWhenSeen";
import { NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND } from "./notifyReceivedRequestToAddFriend";
import { NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND } from "./notifyAcceptRequestToAddFriend";
const notificationSubscription = {
  POST_CREATED_SUBSCRIPTIONS,
  UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION,
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND,
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND
};

export default notificationSubscription;
