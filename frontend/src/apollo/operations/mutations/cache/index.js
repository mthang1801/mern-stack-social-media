import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser";
import createSetPosts from "./setPosts";
import createSetNotifications from "./setNotifications";
import createSetCountNumberNotificationsUnseen from "./setCountNumberNotificationsUnseen";
import createSetNewNotifications from "./setNewNotifications";
import createSetOpenPopupNotification from "./setOpenPopupNotification";
import createSetCurrentPersonalUser from "./setCurrentPersonalUser";
import createSetPersonalPosts from "./setPersonalPosts";
import createSetOpenFriendsList from "./setOpenFriendsList";
import createSetFriends from "./setFriends";
import createSetReceivedRequestsToAddFriend from "./setReceivedRequestsToAddFriend";
import createSetSentRequestsToAddFriend from "./setSentRequestsToAddFriend";
import createSetFriendsByAlphabeta from "./setFriendsByAlphabeta";
import createSetCurrentChatUser from "./setCurrentChatUser";
import createSetMessagesStorage from "./setMessagesStorage";

import {
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
  setFriendsByAlphabetaVar,
  setCurrentChatUserVar,
  setMessagesStorageVar,
} from "../../../cache";

const mutations = {
  toggleButtonMenu: createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus: createSetPostStatus(setPostStatusVar),
  setCurrentUser: createSetCurrentUser(setUserVar),
  setPosts: createSetPosts(setPostsVar),
  setNotifications: createSetNotifications(setNotificationsVar),
  setCountNumberNotificationsUnseen: createSetCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  setNewNotifications: createSetNewNotifications(setNewNotificationsVar),
  setOpenPopupNotification: createSetOpenPopupNotification(
    setOpenPopupNotificationVar
  ),
  setCurrentPersonalUser: createSetCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  setPersonalPosts: createSetPersonalPosts(setPersonalPostsVar),
  setOpenFriendsList: createSetOpenFriendsList(setOpenFriendsListVar),
  setFriends: createSetFriends(setFriendsVar),
  setSentRequestsToAddFriend: createSetSentRequestsToAddFriend(
    setSentRequestsToAddFriendVar
  ),
  setReceivedRequestsToAddFriend: createSetReceivedRequestsToAddFriend(
    setReceivedRequestsToAddFriendVar
  ),
  setFriendsByAlphabeta: createSetFriendsByAlphabeta(setFriendsByAlphabetaVar),
  setCurrentChatUser: createSetCurrentChatUser(setCurrentChatUserVar),
  setMessagesStorage: createSetMessagesStorage(setMessagesStorageVar),
};

export { mutations as cacheMutations };
