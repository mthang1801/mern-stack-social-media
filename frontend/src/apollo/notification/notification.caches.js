import {
  notificationsVar,
  countNumberOfNotificationUnseenVar,
  newNotificationsVar,
  latestNotificationVar,
} from "../cache";
import _ from "lodash";
export const addNotificationItemToNotificationsList = (newNotification) => {
  let notifications = [...notificationsVar()];
  return notificationsVar([
    { ...newNotification, new: true },
    ...notifications,
  ]);
};

export const decreaseCountNumberNotificationsUnseen = () => {
  const currentNumber = countNumberOfNotificationUnseenVar();
  return countNumberOfNotificationUnseenVar(currentNumber - 1);
};

export const increaseCountNumberNotificationsUnseen = () => {
  const currentNumber = countNumberOfNotificationUnseenVar();
  return countNumberOfNotificationUnseenVar(currentNumber + 1);
};

export const removeNewNotification = (notificationId) => {
  const newNotifications = newNotificationsVar();
  if (newNotifications.has(notificationId)) {
    return newNotificationsVar(
      new Set(
        [...newNotifications].filter(
          (notification) => notification._id !== notificationId
        )
      )
    );
  }
};

export const removeNotificationItemFromNotificationsList = (
  removedNotification
) => {
  let notifications = [...notificationsVar()];
  const updatedNotifications = notifications.filter(
    (notification) => notification._id !== removedNotification._id
  );
  return notificationsVar(updatedNotifications);
};


export const setCountNumberNotificationsUnseen = (num) =>
  countNumberOfNotificationUnseenVar(num);

export const setLatestNotification = (notification) => {
  if(notification){
    return latestNotificationVar({ ...notification });
  }else{
    return latestNotificationVar(null);
  }
  
};

export const setNewNotifications = (notificationId) =>
  newNotificationsVar(newNotificationsVar().add(notificationId));

export const setNotifications = (notifications) =>
  notificationsVar(notifications);

export const updateNotificationHasSeen = (notificationId) => {
  let notifications = [...notificationsVar()];
  const updatedNotifications = notifications.map((notification) => {
    let _notification = { ...notification };
    if (notification._id === notificationId) {
      _notification.hasSeen = true;
    }
    return { ..._notification };
  });
  return notificationsVar(updatedNotifications);
};

export const updateNotificationItemInNotificationsList = (notification) => {
  let notifications = [...notificationsVar()];
  const updatedNotification = notifications.map((notificationItem) => {
    if (notificationItem._id === notification._id) {
      return { ...notification };
    }
    return { ...notificationItem };
  });
  const sortNotificationByUpdatedAt = _.sortBy(updatedNotification, [
    (o) => -o.updatedAt,
  ]);
  return notificationsVar(sortNotificationByUpdatedAt);
};
