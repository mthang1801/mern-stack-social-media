import {client} from "../apollo/client"
import mutations from "../apollo/operations/mutations"
import {User, Posts, Notifications, NewNotifications, CountNumberNotificationsUnseen} from "../apollo/models"
const clearCache = () => {
  const {setCurrentUser, setCountNumberNotificationsUnseen, setNotifications, setNewNotifications, setPosts} = mutations
  setCurrentUser(User)
  setCountNumberNotificationsUnseen(CountNumberNotificationsUnseen)
  setPosts(Posts)
  setNotifications(Notifications)
  setNewNotifications(NewNotifications)
}

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  await client.clearStore();
  clearCache()
}

const login = async (token, tokenExpire) => {  
  logout();
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpire",
    new Date(Date.now() + tokenExpire * 1000)
  );
  await client.resetStore();
}

export {logout, login}