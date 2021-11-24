import {
  notificationsVar,
  countNumberOfNotificationUnseenVar,
  newNotificationsVar,
  latestNotificationVar,
  userVar,
} from '../cache';
import _ from 'lodash';

import { initialState } from '../initialState';

export const decreaseCountNumberNotificationsUnseen = () => {
  const currentNumber = countNumberOfNotificationUnseenVar();
  return countNumberOfNotificationUnseenVar(
    Math.min(initialState.countNumberOfNotificationUnseen, currentNumber - 1)
  );
};

export const increaseCountNumberNotificationsUnseen = () => {
  const currentNumber = countNumberOfNotificationUnseenVar();
  return countNumberOfNotificationUnseenVar(currentNumber + 1);
};

export const setCountNumberNotificationsUnseen = (num) => {
  if (Number.isInteger(num)) {
    return countNumberOfNotificationUnseenVar(num);
  }
};

export const addNotificationItemToNotificationsList = (newNotification) => {
  let notifications = [...notificationsVar()];
  increaseCountNumberNotificationsUnseen();
  const user = userVar();
  userVar({
    ...user,
    notifications: [...new Set([...user.notifications, newNotification._id])],
  });

  return notificationsVar([
    { ...newNotification, new: true },
    ...notifications,
  ]);
};

export const addNotificationsToNotifcationsList = (notifications) => {
  const prevNotifications = [...notificationsVar()];
  if (Array.isArray(notifications)) {
    return notificationsVar([...prevNotifications, ...notifications]);
  }
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
  removeNewNotification(removedNotification._id);
  const latestNotification = latestNotificationVar();
  if (latestNotification?._id === removedNotification._id) {
    latestNotificationVar(initialState.latestNotification);
  }
  const user = { ...userVar() };
  user.notifications = user.notifications.filter(
    (notification) => notification._id !== removedNotification._id
  );
  userVar(user);
  console.log(notifications);
  console.log(removedNotification);
  const updatedNotifications = notifications.filter((notification) => {
    if (notification._id === removedNotification._id) {
      if (!removedNotification.hasSeen) {
        decreaseCountNumberNotificationsUnseen();
      }
      return false;
    }
    return true;
  });

  return notificationsVar(updatedNotifications);
};

export const setLatestNotification = (notification) => {
  if (notification) {
    return latestNotificationVar({ ...notification });
  } else {
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

export const resetCountNumberOfNotificationUnseenVar = () =>
  countNumberOfNotificationUnseenVar(
    initialState.countNumberOfNotificationUnseen
  );
export const clearNewNotificationsVar = () =>
  newNotificationsVar(initialState.newNotifications);
export const clearLatestNotification = () =>
  latestNotificationVar(initialState.latestNotification);
export const clearNotifications = () =>
  notificationsVar(initialState.notifications);

export const removeNotificationWhenUserRejectToAddFriend = (
  removedNotification
) => {
  const notifications = [...notificationsVar()];
  console.log(removedNotification, notifications);
  removeNewNotification(removedNotification._id);
  const latestNotification = latestNotificationVar();
  if (latestNotification?._id === removedNotification._id) {
    latestNotificationVar(initialState.latestNotification);
  }
  const updatedNotifications = notifications.filter((notification) => {
    if (
      // notification?.field === removedNotification.field &&
      // notification?.content === removedNotification.content &&
      // notification?.fieldIdentity?.sender?._id ===
      //   removedNotification.fieldIdentity.sender._id &&
      // notification?.fieldIdentity?.receiver?._id ===
      //   removedNotification.fieldIdentity.receiver._id
      notification._id === removedNotification._id
    ) {
      if (!notification.hasSeen) {
        decreaseCountNumberNotificationsUnseen();
      }
      return false;
    }
    return true;
  });
  return notificationsVar(updatedNotifications);
};
