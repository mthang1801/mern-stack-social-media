const updateNotificationHasSeen = setNotificationsVar => notificationId => {
  let notifications = [...setNotificationsVar()];
  const updatedNotifications = notifications.map(notification => {
    let _notification = {...notification};
    if(notification._id === notificationId){
      _notification.hasSeen = true; 
    }
    return {..._notification};
  })
  return setNotificationsVar(updatedNotifications);
}

export default updateNotificationHasSeen;