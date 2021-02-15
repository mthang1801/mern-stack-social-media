import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser"
import createSetPosts from "./setPosts"
import createSetNotifications from "./setNotifications";
import {toggleButtonMenuVar, setPostStatusVar,setUserVar, setPostsVar, setNotificationsVar} from "../../cache"
export {SIGNUP} from "./signup"
export {CREATE_POST} from "./createPost"
export {UPDATE_USER_HAS_SEEN_NOTIFICATION} from "./updateUserHasSeenNotification"
const mutations = {
  toggleButtonMenu : createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus : createSetPostStatus(setPostStatusVar),
  setCurrentUser : createSetCurrentUser(setUserVar),
  setPosts : createSetPosts(setPostsVar),
  setNotifications : createSetNotifications(setNotificationsVar)
}

export {mutations as default }