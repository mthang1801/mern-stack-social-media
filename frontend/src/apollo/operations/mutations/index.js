import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser";
import createSetPosts from "./setPosts";
import createSetNotifications from "./setNotifications";
import createSetCountNumberNotificationsUnseen from "./setCountNumberNotificationsUnseen";
import createSetNewNotifications from "./setNewNotifications";
import createSetLoadingNotificationsMore from "./setLoadingNotificationMore";
import createSetOpenPopupNotification from "./setOpenPopupNotification";
import createSetPersonalUsers from "./setPersonalUsers";
import createSetCurrentPersonalUser from "./setCurrentPersonalUser";
import createSetPersonalPosts from "./setPersonalPosts";
import {
  toggleButtonMenuVar,
  setPostStatusVar,
  setUserVar,
  setPostsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLoadingNotificationsMoreVar,
  setOpenPopupNotificationVar,
  setPersonalUsersVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
} from "../../cache";
export { SIGNUP } from "./signup";
export { CREATE_POST } from "./createPost";
export { UPDATE_USER_HAS_SEEN_NOTIFICATION } from "./updateUserHasSeenNotification";
export { SEND_REQUEST_TO_ADD_FRIEND } from "./user/sendRequestToAddFriend";
export { REJECT_REQUEST_TO_ADD_FRIEND } from "./user/rejectRequestToAddFriend";
export { CANCEL_REQUEST_TO_ADD_FRIEND } from "./user/cancelRequestToAddFriend";
export { FOLLOW_USER } from "./user/followUser";
export { UNFOLLOW_USER } from "./user/unFollowUser";
export { ACCEPT_REQUEST_TO_ADD_FRIEND } from "./user/acceptRequestToAddFriend";
export { REMOVE_FRIEND } from "./user/removeFriend";
const mutations = {
  toggleButtonMenu: createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus: createSetPostStatus(setPostStatusVar),
  setCurrentUser: createSetCurrentUser(setUserVar),
  setPosts: createSetPosts(setPostsVar),
  setNotifications: createSetNotifications(setNotificationsVar),
  setCountNumberNotificationsUnseen: createSetCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  setNewNotifications: createSetNewNotifications(setNewNotificationsVar),
  setLoadingNotificationsMore: createSetLoadingNotificationsMore(
    setLoadingNotificationsMoreVar
  ),
  setOpenPopupNotification: createSetOpenPopupNotification(
    setOpenPopupNotificationVar
  ),
  setPersonalUsers: createSetPersonalUsers(setPersonalUsersVar),
  setCurrentPersonalUser: createSetCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  setPersonalPosts: createSetPersonalPosts(setPersonalPostsVar),
};

export { mutations as default };
