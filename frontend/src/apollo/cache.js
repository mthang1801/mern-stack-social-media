import { InMemoryCache, makeVar } from "@apollo/client";
import {
  ToggleButtonMenu,
  PostStatus,
  User,
  Posts,
  Notifications,
  CountNumberNotificationsUnseen,
  NewNotifications,
  LoadingNotificationMore,
  OpenPopupNotification
} from "./models";
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
const setPostStatusVar = makeVar(PostStatus);
const setUserVar = makeVar(User);
const setPostsVar = makeVar(Posts);
const setNotificationsVar = makeVar(Notifications);
const setCountNumberNotificationsUnseenVar = makeVar(CountNumberNotificationsUnseen);
const setNewNotificationsVar = makeVar(NewNotifications);
const setLoadingNotificationsMoreVar = makeVar(LoadingNotificationMore);
const setOpenPopupNotificationVar = makeVar(OpenPopupNotification);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        toggleButtonMenu: {
          read: () => toggleButtonMenuVar(),
        },
        postStatus: {
          read: () => setPostStatusVar(),
        },
        user: {
          read: () => setUserVar(),
        },
        posts: {
          read: () => setPostsVar(),
        },
        notifications: {
          read: () => setNotificationsVar(),
        },
        newNotifications : {
          read : () => setNewNotificationsVar()
        },
        loadingNotificationsMore : {
          read : () => setLoadingNotificationsMoreVar()
        },
        openPopupNotification : {
          read : () => setOpenPopupNotificationVar()
        },
        countNumberNotificationsUnseen : {
          read : () => setCountNumberNotificationsUnseenVar()
        }
      },
    },
  },
});

export {
  cache,
  toggleButtonMenuVar,
  setPostStatusVar,
  setUserVar,
  setPostsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLoadingNotificationsMoreVar,
  setOpenPopupNotificationVar
};
