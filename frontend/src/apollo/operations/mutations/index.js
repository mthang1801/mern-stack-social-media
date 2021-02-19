import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser";
import createSetPosts from "./setPosts";
import createSetNotifications from "./setNotifications";
import createSetCountNumberNotificationsUnseen from "./setCountNumberNotificationsUnseen";
import createSetNewNotifications from "./setNewNotifications"
import createSetLoadingNotificationsMore from "./setLoadingNotificationMore"
import createSetOpenPopupNotification from "./setOpenPopupNotification"
import createSetPersonalUsers from "./setPersonalUsers";
import createSetCurrentPersonalUser from "./setCurrentPersonalUser";
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
  setCurrentPersonalUserVar
} from "../../cache";
export { SIGNUP } from "./signup";
export { CREATE_POST } from "./createPost";
export { UPDATE_USER_HAS_SEEN_NOTIFICATION } from "./updateUserHasSeenNotification";
const mutations = {
  toggleButtonMenu: createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus: createSetPostStatus(setPostStatusVar),
  setCurrentUser: createSetCurrentUser(setUserVar),
  setPosts: createSetPosts(setPostsVar),
  setNotifications: createSetNotifications(setNotificationsVar),
  setCountNumberNotificationsUnseen: createSetCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  setNewNotifications : createSetNewNotifications(setNewNotificationsVar),
  setLoadingNotificationsMore : createSetLoadingNotificationsMore(setLoadingNotificationsMoreVar),
  setOpenPopupNotification : createSetOpenPopupNotification(setOpenPopupNotificationVar),
  setPersonalUsers : createSetPersonalUsers(setPersonalUsersVar),
  setCurrentPersonalUser : createSetCurrentPersonalUser(setCurrentPersonalUserVar)
};

export { mutations as default };
