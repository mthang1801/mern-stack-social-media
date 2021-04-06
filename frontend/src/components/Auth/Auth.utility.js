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
const clearCache = () => {
  const {
    setCurrentUser,
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setPosts,
    clearCurrentChat,
    setFriends,
    clearMessageStorage,
  } = cacheMutations;
  setCurrentUser(User);
  setCountNumberNotificationsUnseen(CountNumberNotificationsUnseen);
  setPosts(Posts);
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
  const { setCurrentUser } = cacheMutations;
  setCurrentUser({ ...user });
  if (typeof window !== "undefined") {
    restartWebsocketConnection();
  }
};

export { logout, login };
