import { client } from "../apollo/client";
import { cacheMutations } from "../apollo/operations/mutations";
import {initialState} from "../apollo/initialState"
import {postsVar} from "../apollo/cache"
import {
  User,
  Posts,
  Notifications,
  NewNotifications,
  CountNumberNotificationsUnseen,
} from "../apollo/models";
const clearCache = () => {
  const {
    setCurrentUser,
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,    
  } = cacheMutations;
  setCurrentUser(User);
  setCountNumberNotificationsUnseen(CountNumberNotificationsUnseen);
  postsVar(initialState.posts);
  setNotifications(Notifications);
  setNewNotifications(NewNotifications);
};

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  await client.clearStore();
  clearCache();
};

const login = async (token, tokenExpire) => {
  logout();
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpire",
    new Date(Date.now() + tokenExpire * 1000)
  );
  await client.resetStore();
};

export { logout, login };
