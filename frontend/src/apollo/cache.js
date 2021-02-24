import { InMemoryCache, makeVar } from "@apollo/client";
import {
  ToggleButtonMenu,
  PostStatus,
  User,
  Posts,
  Notifications,
  CountNumberNotificationsUnseen,
  NewNotifications,
  OpenPopupNotification,
  PersonalUsers,
  CurrentPersonalUser,
  PersonalPosts
} from "./models";
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
const setPostStatusVar = makeVar(PostStatus);
const setUserVar = makeVar(User);
const setPostsVar = makeVar(Posts);
const setNotificationsVar = makeVar(Notifications);
const setCountNumberNotificationsUnseenVar = makeVar(
  CountNumberNotificationsUnseen
);
const setNewNotificationsVar = makeVar(NewNotifications);
const setOpenPopupNotificationVar = makeVar(OpenPopupNotification);
const setPersonalUsersVar = makeVar(PersonalUsers);
const setCurrentPersonalUserVar = makeVar(CurrentPersonalUser);
const setPersonalPostsVar = makeVar(PersonalPosts);

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
        personalUsers: {
          read: () => setPersonalUsersVar(),
        },
        currentPersonalUser: {
          read: () => setCurrentPersonalUserVar(),
        },
        posts: {
          read: () => setPostsVar(),
        },
        personalPosts: {
          read: () => setPersonalPostsVar(),
        },
        notifications: {
          read: () => setNotificationsVar(),
        },
        newNotifications: {
          read: () => setNewNotificationsVar(),
        },      
        openPopupNotification: {
          read: () => setOpenPopupNotificationVar(),
        },
        countNumberNotificationsUnseen: {
          read: () => setCountNumberNotificationsUnseenVar(),
        },       
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
  setOpenPopupNotificationVar,
  setPersonalUsersVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,  
};
