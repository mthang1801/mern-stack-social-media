import _ from "lodash";

const updateNotificationItemInNotificationsList = setNotificationsVar => notification => {
  let notifications = [...setNotificationsVar()];
  const updatedNotification = notifications.map(notificationItem => {
    if(notificationItem._id === notification._id){
      return {...notification}; 
    }
    return {...notificationItem};
  })
  const sortNotificationByUpdatedAt = _.sortBy(updatedNotification, [o => -o.updatedAt])
  return setNotificationsVar(sortNotificationByUpdatedAt);
}

export default updateNotificationItemInNotificationsList;