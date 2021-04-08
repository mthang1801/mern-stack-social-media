import { POST_CREATED_SUBSCRIPTIONS } from "./postCreated";
import { NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND } from "./notifyReceivedRequestToAddFriend";
import { NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND } from "./notifyAcceptRequestToAddFriend";
import { NOTIFY_MENTIONED_USERS_IN_POST } from "./notifyMentionedUsersInPost";
import { LIKE_POST_SUBSCRIPTION } from "./likePostSubscription";
import { REMOVE_LIKE_POST_SUBSCRIPTION } from "./removeLikePostSubscription";
import { NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION } from "./notifyMentionedUsersInComment";
import { NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION } from "./notifyUserCommentPostSubscription";
import { LIKE_COMMENT_SUBSCRIPTION } from "./likeCommentSubscription";
import { REMOVE_LIKE_COMMENT_SUBSCRIPTION } from "./removeLikeCommentSubscription";
import { NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION } from "./notifyUserResponseCommentSubscription";
import { NOTIFY_MENTIONED_USERS_IN_RESPONSE } from "./notifyMentionedUsersInResponse";
const notificationSubscription = {
  POST_CREATED_SUBSCRIPTIONS,  
  NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND,
  NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND,
  NOTIFY_MENTIONED_USERS_IN_POST,
  LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
  NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION,
  NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
  LIKE_COMMENT_SUBSCRIPTION,
  REMOVE_LIKE_COMMENT_SUBSCRIPTION,
  NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION,
  NOTIFY_MENTIONED_USERS_IN_RESPONSE,
};

export default notificationSubscription;
