export const initialState = {
  user: null,
  posts : [],
  toggleMenu: true,
  alertDialog: { agree: false, title: "", content: "", data: null },
  toggleFriendsBoard : false,
  notifications : [],
  countNumberOfNotificationUnseen : 0,
  newNotifications : new Set(),
  latestNotification : null
};
