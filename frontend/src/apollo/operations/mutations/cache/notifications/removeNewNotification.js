const removeNewNotification = setNewNotificationsVar => notificationId => {
  const newNotifications = setNewNotificationsVar();
  if(newNotifications.has(notificationId)){
    return setNewNotificationsVar(new Set([...newNotifications].filter(notification => notification._id !== notificationId)));
  }
}

export default removeNewNotification;