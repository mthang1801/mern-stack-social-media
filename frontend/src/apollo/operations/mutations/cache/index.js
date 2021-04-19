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
  setDialog: createSetDialog(dialogVar),
  clearDialog: createClearDialog(dialogVar),
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
