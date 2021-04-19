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
import {setCurrentUser, clearUser} from "../../apollo/user/user.caches"
import {clearPosts} from "../../apollo/post/post.caches"
import {clearCurrentChat, clearMessageStorage} from "../../apollo/chat/chat.caches"
import {clearLatestNotification, clearNewNotificationsVar, clearNotifications, resetCountNumberOfNotificationUnseenVar} from "../../apollo/notification/notification.caches"
const clearCache = () => {
  const {        
    setFriends,
  } = cacheMutations;
  clearUser();
  clearPosts();
  resetCountNumberOfNotificationUnseenVar();
  clearNotifications();
  clearNewNotificationsVar();
  clearLatestNotification();
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
