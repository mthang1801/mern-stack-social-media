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
import {userVar, postsVar} from "../../apollo/cache"
import { initialState } from "../../apollo/initialState";
import {setCurrentUser} from "../../apollo/user/user.caches"
const clearCache = () => {
  const {    
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    clearCurrentChat,
    setFriends,
    clearMessageStorage,
  } = cacheMutations;
  userVar(initialState.user);
  postsVar(initialState.posts);
  setCountNumberNotificationsUnseen(CountNumberNotificationsUnseen);
  setNotifications(Notifications);
  setNewNotifications(NewNotifications);
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
