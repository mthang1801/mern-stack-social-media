import {
  client,
  restartWebsocketConnection,
  closeWebsocketConnection,
} from "../../apollo/client";
import { cacheMutations } from "../../apollo/operations/mutations";
import {
  User,
  Posts,
  Notifications,
  NewNotifications,
  CountNumberNotificationsUnseen,
  CurrentChat,
  Friends,
  MessagesStorage,
} from "../../apollo/models";
import {userVar, postsVar, countNumberOfNotificationUnseenVar, notificationsVar, newNotificationsVar} from "../../apollo/cache"
import { initialState } from "../../apollo/initialState";
import {setCurrentUser} from "../../apollo/user/user.caches"
const clearCache = () => {
  const {    
    setNewNotifications,
    clearCurrentChat,
    setFriends,
    clearMessageStorage,
  } = cacheMutations;
  userVar(initialState.user);
  postsVar(initialState.posts);
  countNumberOfNotificationUnseenVar(initialState.countNumberOfNotificationUnseen);
  notificationsVar(initialState.notifications);
  newNotificationsVar(initialState.newNotifications);
  clearCurrentChat();
  setFriends(Friends);
  clearMessageStorage();
};

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  clearCache();
  await client.resetStore();
  if (typeof window !== "undefined") {
    closeWebsocketConnection();
  }
};

const login = async (user, token, tokenExpire) => {
  // await logout();
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpire",
    new Date(Date.now() + tokenExpire * 1000)
  );
  setCurrentUser(user)
  if (typeof window !== "undefined") {
    restartWebsocketConnection();
  }
};

export { logout, login };
