import {
  userVar,
  friendsVar,
  receivedRequestsToAddFriendVar,
  sentRequestsToAddFriendVar,
} from "../cache";
import { initialState } from "../initialState";

export const addFetchedFriendsToFriendsData = (fetchedFriends) => {
  const user = { ...userVar() };
  user.friendsData = user.friendsData
    ? [...user.friendsData, ...fetchedFriends]
    : [...fetchedFriends];
  return userVar(user);
};

export const setCurrentUser = (user) => userVar(user);

export const setUserFriendsData = (friends) => {
  const user = { ...userVar() };
  if (user.contact?.friendsData) {
    user.contact.friendsData = [...friends];
  }
  return userVar({ ...user });
};

export const clearUser = () => userVar(initialState.user);

export const setFriends = (friendsList) => friendsVar([...friendsList]);

export const setMoreFriends = (friends) => {
  const prevFriends = [...friendsVar()];
  return friendsVar([...prevFriends, ...friends]);
};

export const setReceivedRequestsToAddFriend = (senderRequest) =>
  receivedRequestsToAddFriendVar([...senderRequest]);

export const setSentRequestsToAddFriend = (receiversRequest) =>
  sentRequestsToAddFriendVar([...receiversRequest]);


export const clearFriends = () => friendsVar(initialState.friends)