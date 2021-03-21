const setNewNotifications = (setNewNotificationsVar) => (notificationId) =>
  setNewNotificationsVar(setNewNotificationsVar().add(notificationId));

export default setNewNotifications;
