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
import createSetInitialMessagesStorage from "./setInitialMessagesStorage";
import createSetMessagesStorage from "./setMessagesStorage";
import createSetCurrentChat from "./setCurrentChat";
import createClearCurrentChat from "./clearCurrentChat";
import createUpdateMessagesStorage from "./updateMessagesStorage";
import createUpdateHasSeenLatestMessage from './updateHasSeenLatestMessage';
import createClearMessageStorage from "./clearMessageStorage";
import createUpdateMessagesStorageWhenReceiverSeenAllMessages from "./updateMessagesStorageWhenReceiverSeenAllMessages";
import createSetNumberOfConversations from "./setNumberOfConversations";
import createUpdateMoreMessages from "./updateMoreMessages"
import createUpdateUserOnlineOffline from "./updateUserOnlineOffline"
import createUpdateUserOnlineOfflineMessagesStorage from "./updateUserOnlineOfflineMessagesStorage"
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
  setMessagesStorageVar,
  setCurrentChatVar,
  setNumberOfConversationsVar
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
  setInitialMessagesStorage: createSetInitialMessagesStorage(
    setMessagesStorageVar
  ),
  setMessagesStorage: createSetMessagesStorage(setMessagesStorageVar),
  updateMessagesStorage: createUpdateMessagesStorage(setMessagesStorageVar),
  updateHasSeenLatestMessage : createUpdateHasSeenLatestMessage(setMessagesStorageVar),
  setCurrentChat: createSetCurrentChat(setCurrentChatVar),
  clearCurrentChat : createClearCurrentChat(setCurrentChatVar),
  updateMessagesStorageWhenReceiverSeenAllMessages: createUpdateMessagesStorageWhenReceiverSeenAllMessages(
    setMessagesStorageVar
  ),
  clearMessageStorage: createClearMessageStorage(setMessagesStorageVar),
  setNumberOfConversations : createSetNumberOfConversations(setNumberOfConversationsVar),
  updateMoreMessages : createUpdateMoreMessages(setMessagesStorageVar),
  updateUserOnlineOffline : createUpdateUserOnlineOffline(setFriendsVar),
  updateUserOnlineOfflineMessagesStorage : createUpdateUserOnlineOfflineMessagesStorage(setMessagesStorageVar)
};

export { mutations as cacheMutations };
