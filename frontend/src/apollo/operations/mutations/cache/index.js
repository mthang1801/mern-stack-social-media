//Friends
import createSetOpenFriendsList from "./friends/setOpenFriendsList";
import createSetFriends from "./friends/setFriends";
import createSetReceivedRequestsToAddFriend from "./friends/setReceivedRequestsToAddFriend";
import createSetSentRequestsToAddFriend from "./friends/setSentRequestsToAddFriend";
import createSetMoreFriends from "./friends/setMoreFriends";

import {  
  toggleFriendsBoardVar,
  friendsVar,
  sentRequestsToAddFriendVar,
  receivedRequestsToAddFriendVar,
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
  
};

export { mutations as cacheMutations };
