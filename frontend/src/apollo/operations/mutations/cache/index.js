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
import createUpdateMessagesStorageToReceivedWhenUserOnline from "./messagesStorage/updateMessagesStorageToReceivedWhenUserOnline";
import createAddNewConversationToMessagesStorage from "./messagesStorage/addNewConversationToMessagesStorage";


import {  
  toggleFriendsBoardVar,
  friendsVar,
  sentRequestsToAddFriendVar,
  receivedRequestsToAddFriendVar,
  messagesStorageVar,
  currentChatVar,  
} from "../../../cache";

const mutations = {

  //Friends
  setOpenFriendsList: createSetOpenFriendsList(toggleFriendsBoardVar),
  setFriends: createSetFriends(friendsVar),
  setSentRequestsToAddFriend: createSetSentRequestsToAddFriend(
    sentRequestsToAddFriendVar
  ),
  setReceivedRequestsToAddFriend: createSetReceivedRequestsToAddFriend(
    receivedRequestsToAddFriendVar
  ),
  setMoreFriends: createSetMoreFriends(friendsVar),
  //Messages Storage
  setInitialMessagesStorage: createSetInitialMessagesStorage(
    messagesStorageVar
  ),
  setMessagesStorage: createSetMessagesStorage(messagesStorageVar),
  updateMessagesStorage: createUpdateMessagesStorage(messagesStorageVar),
  updateHasSeenLatestMessage: createUpdateHasSeenLatestMessage(
    messagesStorageVar
  ),
  clearMessageStorage: createClearMessageStorage(messagesStorageVar),
  updateMessagesStorageWhenReceiverSeenAllMessages: createUpdateMessagesStorageWhenReceiverSeenAllMessages(
    messagesStorageVar
  ),
  updateMoreMessages: createUpdateMoreMessages(messagesStorageVar),
  updateMessagesStorageToReceivedWhenUserOnline: createUpdateMessagesStorageToReceivedWhenUserOnline(
    messagesStorageVar
  ),
  addNewConversationToMessagesStorage: createAddNewConversationToMessagesStorage(
    messagesStorageVar
  ),
};

export { mutations as cacheMutations };
