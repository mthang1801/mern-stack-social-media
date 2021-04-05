const updateNotificationItemInNotificationsList = setNotificationsVar => notification => {
  let notifications = [...setNotificationsVar()];
  const updatedNotification = notifications.map(notificationItem => {
    if(notificationItem._id === notification._id){
      return {...notification}; 
    }
    return {...notificationItem};
  })
  return setNotificationsVar(updatedNotification);
}

export default updateNotificationItemInNotificationsList;