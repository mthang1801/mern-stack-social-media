//Controls
import createToggleButtonMenu from "./controls/toggleButtonMenu";
import createSetDialog from "./controls/setDialog";
import createClearDialog from "./controls/clearDialog";
//Post
import createSetPersonalPosts from "./post/setPersonalPosts";
//Comment
import createAddCommentToOwnerPost from "./post/addCommentToOwnerPost";

//User
import createClearCurrentChat from "./user/clearCurrentChat";

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
  dialogVar,    
  currentPersonalUserVar,
  setPersonalPostsVar,
  toggleFriendsBoardVar,
  friendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setMessagesStorageVar,
  setCurrentChatVar,
  setNumberOfConversationsVar,
} from "../../../cache";

const mutations = {
  //Controls
  toggleButtonMenu: createToggleButtonMenu(toggleMenuVar),
  setDialog: createSetDialog(dialogVar),
  clearDialog: createClearDialog(dialogVar),
  //Post  
  setPersonalPosts: createSetPersonalPosts(setPersonalPostsVar),      
  //Comment  
  addCommentToOwnerPost: createAddCommentToOwnerPost(setPersonalPostsVar),  
  //User 

  //Friends
  setOpenFriendsList: createSetOpenFriendsList(toggleFriendsBoardVar),
  setFriends: createSetFriends(friendsVar),
  setSentRequestsToAddFriend: createSetSentRequestsToAddFriend(
    setSentRequestsToAddFriendVar
  ),
  setReceivedRequestsToAddFriend: createSetReceivedRequestsToAddFriend(
    setReceivedRequestsToAddFriendVar
  ),
  setMoreFriends: createSetMoreFriends(friendsVar),
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
  updateUserOnlineOffline: createUpdateUserOnlineOffline(friendsVar),
  updateUserOnlineOfflineMessagesStorage: createUpdateUserOnlineOfflineMessagesStorage(
    setMessagesStorageVar
  ),
};

export { mutations as cacheMutations };
