//Controls
import createToggleButtonMenu from "./controls/toggleButtonMenu";
//Post
import createSetPostStatus from "./post/setPostStatus";
import createSetPosts from "./post/setPosts";
import createSetPersonalPosts from "./post/setPersonalPosts";
import createSetNewPost from "./post/setNewPost"
import createUpdateLikePost from "./post/updateLikePost"
import createUpdateUnlikePost from "./post/updateUnlikePost";
//Comment
import createAddCommentToPost from "./post/addCommentToPost";
import createAddCommentToOwnerPost from "./post/addCommentToOwnerPost"
import createAddCommentsToPost from "./post/addCommentsToPost"
//Response
import createAddResponseToComment from "./post/addNewResponseToComment"
//User
import createSetCurrentUser from "./user/setCurrentUser";
import createSetCurrentPersonalUser from "./user/setCurrentPersonalUser";
import createClearCurrentChat from "./user/clearCurrentChat";
//Notifications
import createSetNotifications from "./notifications/setNotifications";
import createSetCountNumberNotificationsUnseen from "./notifications/setCountNumberNotificationsUnseen";
import createSetNewNotifications from "./notifications/setNewNotifications";
import createSetLatestNotification from "./notifications/setLatestNotification";
import createAddNewNotification from "./notifications/addNewNotification";
import createIncreaseCountNumberNotificationsUnseen from "./notifications/increaseCountNumberNotificationsUnseen";
import createDecreaseCountNumberNotificationsUnseen from "./notifications/decreaseCountNumberNotificationsUnseen";
//Friends
import createSetOpenFriendsList from "./friends/setOpenFriendsList";
import createSetFriends from "./friends/setFriends";
import createSetReceivedRequestsToAddFriend from "./friends/setReceivedRequestsToAddFriend";
import createSetSentRequestsToAddFriend from "./friends/setSentRequestsToAddFriend";
import createSetMoreFriends from "./friends/setMoreFriends"
//Messages Storage
import createSetInitialMessagesStorage from "./messagesStorage/setInitialMessagesStorage";
import createSetMessagesStorage from "./messagesStorage/setMessagesStorage";
import createUpdateMessagesStorage from "./messagesStorage/updateMessagesStorage";
import createUpdateHasSeenLatestMessage from './messagesStorage/updateHasSeenLatestMessage';
import createClearMessageStorage from "./messagesStorage/clearMessageStorage";
import createUpdateMessagesStorageWhenReceiverSeenAllMessages from "./messagesStorage/updateMessagesStorageWhenReceiverSeenAllMessages";
import createUpdateMoreMessages from "./messagesStorage/updateMoreMessages"
import createSetCurrentChat from "./chat/setCurrentChat";
import createUpdateMessagesStorageToReceivedWhenUserOnline from "./messagesStorage/updateMessagesStorageToReceivedWhenUserOnline"
import createAddNewConversationToMessagesStorage from "./messagesStorage/addNewConversationToMessagesStorage";
//Chat
import createSetNumberOfConversations from "./chat/setNumberOfConversations";
import createUpdateUserOnlineOffline from "./chat/updateUserOnlineOffline"
import createUpdateUserOnlineOfflineMessagesStorage from "./chat/updateUserOnlineOfflineMessagesStorage"


import {
  toggleButtonMenuVar,
  setPostStatusVar,
  setUserVar,
  setPostsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLatestNotificationVar,
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
  //Controls
  toggleButtonMenu: createToggleButtonMenu(toggleButtonMenuVar),
  //Post
  setPostStatus: createSetPostStatus(setPostStatusVar),
  setPosts: createSetPosts(setPostsVar),
  setPersonalPosts: createSetPersonalPosts(setPersonalPostsVar),
  setNewPost : createSetNewPost(setPostsVar),
  updateLikePost : createUpdateLikePost(setPostsVar),
  updateUnlikePost : createUpdateUnlikePost(setPostsVar),  
  //Comment
  addCommentToPost : createAddCommentToPost(setPostsVar),
  addCommentToOwnerPost : createAddCommentToOwnerPost(setPersonalPostsVar),
  addCommentsToPost : createAddCommentsToPost(setPostsVar),
  //Response
  addResponseToComment : createAddResponseToComment(setPostsVar),
  //User
  setCurrentUser: createSetCurrentUser(setUserVar),
  setCurrentPersonalUser: createSetCurrentPersonalUser(
    setCurrentPersonalUserVar
  ),
  //Notifications
  setNotifications: createSetNotifications(setNotificationsVar),
 
  setNewNotifications: createSetNewNotifications(setNewNotificationsVar),
  setLatestNotification: createSetLatestNotification(
    setLatestNotificationVar
  ),
  addNewNotification : createAddNewNotification(setNotificationsVar),
  setCountNumberNotificationsUnseen: createSetCountNumberNotificationsUnseen(
    setCountNumberNotificationsUnseenVar
  ),
  increaseNumberNotificationsUnseen : createIncreaseCountNumberNotificationsUnseen(setCountNumberNotificationsUnseenVar),
  decreaseNumberNotificationsUnseen : createDecreaseCountNumberNotificationsUnseen(setCountNumberNotificationsUnseenVar),
  //Friends
  setOpenFriendsList: createSetOpenFriendsList(setOpenFriendsListVar),
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
