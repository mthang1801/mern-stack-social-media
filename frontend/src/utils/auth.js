import { client } from '../apollo/client';
import { initialState } from '../apollo/initialState';
import {
  postsVar,
  userVar,
  countNumberOfNotificationUnseenVar,
  notificationsVar,
  newNotificationsVar,
} from '../apollo/cache';

const clearCache = () => {
  userVar(initialState.user);
  postsVar(initialState.posts);
  countNumberOfNotificationUnseenVar(
    initialState.countNumberOfNotificationUnseen
  );
  notificationsVar(initialState.notifications);
  newNotificationsVar(initialState.newNotifications);
};

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpire');
  await client.clearStore();
  clearCache();
};

const login = async (token, tokenExpire) => {
  logout();
  localStorage.setItem('token', token);
  localStorage.setItem(
    'tokenExpire',
    new Date(Date.now() + tokenExpire * 1000)
  );
  await client.resetStore();
};

export { logout, login };
