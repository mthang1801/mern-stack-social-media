

const removeNotificationItemFromNotificationsList = setNotificationsVar => removedNotification => {
  let notifications = [...setNotificationsVar()];
  const updatedNotifications = notifications.filter(notification => notification._id !== removedNotification._id);
  return setNotificationsVar(updatedNotifications);
}

export default removeNotificationItemFromNotificationsList;