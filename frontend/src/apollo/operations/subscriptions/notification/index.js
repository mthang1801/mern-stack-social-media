import { POST_CREATED_SUBSCRIPTIONS } from "./postCreated";
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
import { LIKE_RESPONSE_SUBSCRIPTION } from "./likeResponseSubscription";
import { REMOVE_LIKE_RESPONSE_SUBSCRIPTION } from "./removeLikeResponseSubscription";
import { SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION } from "./sentRequestToAddFriendSubscription";
import { CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION } from "./cancelRequestToAddFriend";
const notificationSubscription = {
  POST_CREATED_SUBSCRIPTIONS,    
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
  LIKE_RESPONSE_SUBSCRIPTION,
  REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
  SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION
};

export default notificationSubscription;
