import { SEND_REQUEST_TO_ADD_FRIEND } from "./sendRequestToAddFriend";
import { REJECT_REQUEST_TO_ADD_FRIEND } from "./rejectRequestToAddFriend";
import { CANCEL_REQUEST_TO_ADD_FRIEND } from "./cancelRequestToAddFriend";
import { FOLLOW_USER } from "./followUser";
import { UNFOLLOW_USER } from "./unFollowUser";
import { ACCEPT_REQUEST_TO_ADD_FRIEND } from "./acceptRequestToAddFriend";
import { REMOVE_FRIEND } from "./removeFriend";
import { SIGNUP } from "./signup"

export {SEND_REQUEST_TO_ADD_FRIEND}
export {REJECT_REQUEST_TO_ADD_FRIEND}
export {CANCEL_REQUEST_TO_ADD_FRIEND}
export {FOLLOW_USER}
export {UNFOLLOW_USER}
export {ACCEPT_REQUEST_TO_ADD_FRIEND}
export {REMOVE_FRIEND}
export {SIGNUP}

export const userMutations = {
  SEND_REQUEST_TO_ADD_FRIEND,
  REJECT_REQUEST_TO_ADD_FRIEND,
  CANCEL_REQUEST_TO_ADD_FRIEND,
  FOLLOW_USER,
  UNFOLLOW_USER,
  ACCEPT_REQUEST_TO_ADD_FRIEND,
  REMOVE_FRIEND,
  SIGNUP
}