import { InMemoryCache, makeVar } from "@apollo/client";
import {
  ToggleButtonMenu,
  PostStatus,
  User,
  Posts,
  Notifications,
} from "./models";
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
const setPostStatusVar = makeVar(PostStatus);
const setUserVar = makeVar(User);
const setPostsVar = makeVar(Posts);
const setNotificationsVar = makeVar(Notifications);
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
};
