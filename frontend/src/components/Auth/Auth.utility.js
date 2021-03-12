import { client } from "../../apollo/client";
import {cacheMutations} from "../../apollo/operations/mutations";
import {
  User,
  Posts,
  Notifications,
  NewNotifications,
  CountNumberNotificationsUnseen,  
  CurrentChat,
  Friends,
  MessagesStorage
} from "../../apollo/models";
const clearCache = () => {
  const {
    setCurrentUser,
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setPosts,      
    setCurrentChat ,
    setFriends,
    setMessagesStorage
  } = cacheMutations;
  setCurrentUser(User);
  setCountNumberNotificationsUnseen(CountNumberNotificationsUnseen);
  setPosts(Posts);
  setNotifications(Notifications);
  setNewNotifications(NewNotifications);  
  setCurrentChat(CurrentChat);
  setFriends(Friends);
  setMessagesStorage(MessagesStorage)
}

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");    
  await client.resetStore();  
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
