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
  CurrentPersonalUser,
  PersonalPosts,
  OpenFriendsList,
  Friends,
  SentRequestsToAddFriends,
  ReceivedRequestsToAddFriend,
  FriendsByAlphabeta
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
const setCurrentPersonalUserVar = makeVar(CurrentPersonalUser);
const setPersonalPostsVar = makeVar(PersonalPosts);
const setOpenFriendsListVar = makeVar(OpenFriendsList);
const setFriendsVar = makeVar(Friends);
const setSentRequestsToAddFriendVar = makeVar(SentRequestsToAddFriends);
const setReceivedRequestsToAddFriendVar = makeVar(ReceivedRequestsToAddFriend);
const setFriendsByAlphabetaVar = makeVar(FriendsByAlphabeta);

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
        friends: {
          read: () => setFriendsVar(),
        },
        friendsByAlphabeta : {
          read : () => setFriendsByAlphabetaVar()
        },
        sentRequestsToAddFriend : {
          read : () => setSentRequestsToAddFriendVar()
        },
        receivedRequestsToAddFriend : {
          read : () => setReceivedRequestsToAddFriendVar()
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
        openFriendsList: {
          read: () => setOpenFriendsListVar(),
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
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
  setOpenFriendsListVar,
  setFriendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setFriendsByAlphabetaVar
};
