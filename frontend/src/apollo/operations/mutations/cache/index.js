//Controls
import createToggleButtonMenu from "./controls/toggleButtonMenu";
import createSetDialog from "./controls/setDialog";
import createClearDialog from "./controls/clearDialog";
//Post
import createSetPersonalPosts from "./post/setPersonalPosts";
//Comment
import createAddCommentToOwnerPost from "./post/addCommentToOwnerPost";

//User
import createSetCurrentPersonalUser from "./user/setCurrentPersonalUser";
import createClearCurrentChat from "./user/clearCurrentChat";
import createAddPostsToCurrentPersonalUser from "./user/addPostsToCurrentPersonalUser";
import createAddPostItemToCurrentPersonalUser from "./user/addPostItemToCurrentPersonalUser";
import createUpdatePostInCurrentPersonalUser from "./user/updatePostInCurrentPersonalUser";
//Notifications
import createSetNotifications from "./notifications/setNotifications";
import createSetCountNumberNotificationsUnseen from "./notifications/setCountNumberNotificationsUnseen";
import createSetNewNotifications from "./notifications/setNewNotifications";
import createRemoveNewNotification from "./notifications/removeNewNotification";
import createSetLatestNotification from "./notifications/setLatestNotification";
import createAddNotificationItemToNotificationsList from "./notifications/addNotificationItemToNotificationsList";
import createRemoveNotificationItemFromNotificationsList from "./notifications/removeNotificationItemFromNotificationsList";
import createIncreaseCountNumberNotificationsUnseen from "./notifications/increaseCountNumberNotificationsUnseen";
import createDecreaseCountNumberNotificationsUnseen from "./notifications/decreaseCountNumberNotificationsUnseen";
import createUpdateNotificationItemInNotificationsList from "./notifications/updateNotificationItemInNotificationsList";
import createUpdateNotificationHasSeen from "./notifications/updateNotificationHasSeen";
//Friends
import createSetOpenFriendsList from "./friends/setOpenFriendsList";
import createSetFriends from "./friends/setFriends";
import createSetReceivedRequestsToAddFriend from "./friends/setReceivedRequestsToAddFriend";
import createSetSentRequestsToAddFriend from "./friends/setSentRequestsToAddFriend";
import createSetMoreFriends from "./friends/setMoreFriends";
//Messages Storage
import createSetInitialMessagesStorage from "./messagesStorage/setInitialMessagesStorage";
import createSetMessagesStorage from "./messagesStorage/setMessagesStorage";
import createUpdateMessagesStorage from "./messagesStorage/updateMessagesStorage";
import createUpdateHasSeenLatestMessage from "./messagesStorage/updateHasSeenLatestMessage";
import createClearMessageStorage from "./messagesStorage/clearMessageStorage";
import createUpdateMessagesStorageWhenReceiverSeenAllMessages from "./messagesStorage/updateMessagesStorageWhenReceiverSeenAllMessages";
import createUpdateMoreMessages from "./messagesStorage/updateMoreMessages";
import createSetCurrentChat from "./chat/setCurrentChat";
import createUpdateMessagesStorageToReceivedWhenUserOnline from "./messagesStorage/updateMessagesStorageToReceivedWhenUserOnline";
import createAddNewConversationToMessagesStorage from "./messagesStorage/addNewConversationToMessagesStorage";
//Chat
import createSetNumberOfConversations from "./chat/setNumberOfConversations";
import createUpdateUserOnlineOffline from "./chat/updateUserOnlineOffline";
import createUpdateUserOnlineOfflineMessagesStorage from "./chat/updateUserOnlineOfflineMessagesStorage";

import {
  toggleMenuVar,
  setDialogVar,
  setPostStatusVar,
  userVar,
  postsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLatestNotificationVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
  toggleFriendsBoardVar,
  setFriendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setMessagesStorageVar,
  setCurrentChatVar,
  setNumberOfConversationsVar,
} from "../../../cache";

const mutations = {
  //Controls
  toggleButtonMenu: createToggleButtonMenu(toggleMenuVar),
  setDialog: createSetDialog(setDialogVar),
  clearDialog: createClearDialog(setDialogVar),
  //Post  
  setPersonalPosts: createSetPersonalPosts(setPersonalPostsVar),      
  //Comment  
  addCommentToOwnerPost: createAddCommentToOwnerPost(setPersonalPostsVar),  
  //User  
  setCurrentPersonalUser: createSetCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  addPostsToCurrentPersonalUser: createAddPostsToCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  addPostItemToCurrentPersonalUser: createAddPostItemToCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  updatePostInCurrentPersonalUser: createUpdatePostInCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  //Notifications
  setNotifications: createSetNotifications(setNotificationsVar),
  addNotificationItemToNotificationsList: createAddNotificationItemToNotificationsList(
    setNotificationsVar
  ),
  updateNotificationItemInNotificationsList: createUpdateNotificationItemInNotificationsList(
    setNotificationsVar
  ),
  removeNotificationItemFromNotificationsList: createRemoveNotificationItemFromNotificationsList(
    setNotificationsVar
  ),
  updateNotificationHasSeen: createUpdateNotificationHasSeen(
    setNotificationsVar
  ),
  setNewNotifications: createSetNewNotifications(setNewNotificationsVar),
  removeNewNotification: createRemoveNewNotification(setNewNotificationsVar),
  setLatestNotification: createSetLatestNotification(setLatestNotificationVar),
  setCountNumberNotificationsUnseen: createSetCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  increaseNumberNotificationsUnseen: createIncreaseCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  decreaseNumberNotificationsUnseen: createDecreaseCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),

  //Friends
  setOpenFriendsList: createSetOpenFriendsList(toggleFriendsBoardVar),
  setFriends: createSetFriends(setFriendsVar),
  setSentRequestsToAddFriend: createSetSentRequestsToAddFriend(
    setSentRequestsToAddFriendVar
  ),
  setReceivedRequestsToAddFriend: createSetReceivedRequestsToAddFriend(
    setReceivedRequestsToAddFriendVar
  ),
  setMoreFriends: createSetMoreFriends(setFriendsVar),
  //Messages Storage
  setInitialMessagesStorage: createSetInitialMessagesStorage(
    setMessagesStorageVar
  ),
  setMessagesStorage: createSetMessagesStorage(setMessagesStorageVar),
  updateMessagesStorage: createUpdateMessagesStorage(setMessagesStorageVar),
  updateHasSeenLatestMessage: createUpdateHasSeenLatestMessage(
    setMessagesStorageVar
  ),
  clearMessageStorage: createClearMessageStorage(setMessagesStorageVar),
  updateMessagesStorageWhenReceiverSeenAllMessages: createUpdateMessagesStorageWhenReceiverSeenAllMessages(
    setMessagesStorageVar
  ),
  updateMoreMessages: createUpdateMoreMessages(setMessagesStorageVar),
  updateMessagesStorageToReceivedWhenUserOnline: createUpdateMessagesStorageToReceivedWhenUserOnline(
    setMessagesStorageVar
  ),
  addNewConversationToMessagesStorage: createAddNewConversationToMessagesStorage(
    setMessagesStorageVar
  ),
  //Chat
  setCurrentChat: createSetCurrentChat(setCurrentChatVar),
  clearCurrentChat: createClearCurrentChat(setCurrentChatVar),
  setNumberOfConversations: createSetNumberOfConversations(
    setNumberOfConversationsVar
  ),
  updateUserOnlineOffline: createUpdateUserOnlineOffline(setFriendsVar),
  updateUserOnlineOfflineMessagesStorage: createUpdateUserOnlineOfflineMessagesStorage(
    setMessagesStorageVar
  ),
};

export { mutations as cacheMutations };
