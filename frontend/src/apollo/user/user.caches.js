import {
  userVar,
  friendsVar,
  receivedRequestsToAddFriendVar,
  sentRequestsToAddFriendVar,
} from "../cache";
import _ from "lodash";
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

export const setFriendsToCacheData = (friendsList) => {
  const user = { ...userVar() };
  user.friendsCacheData = user.friendsCacheData
    ? [...user.friendsCacheData, ...friendsList]
    : [...friendsList];
  user.friendsCacheData = _.unionBy(user.friendsCacheData, "_id");
  return userVar(user);
};

export const setReceivedRequestsToAddFriendCacheData = (receiversRequest) => {
  const user = { ...userVar() };
  user.receivedRequestsToAddFriendCacheData = user.receivedRequestsToAddFriendCacheData
    ? [...user.receivedRequestsToAddFriendCacheData, ...receiversRequest]
    : [...receiversRequest];
  return userVar(user);
};

export const setSentRequestsToAddFriendCacheData = (senderRequests) => {
  const user = { ...userVar() };
  user.sentRequestsToAddFriendCacheData = user.sentRequestsToAddFriendCacheData
    ? [...user.sentRequestsToAddFriendCacheData, ...senderRequests]
    : [...senderRequests];
  return userVar(user);
};

export const moveReceivedRequestToFriendCacheData = (sender) => {
  const user = { ...userVar() };
  console.log(sender);
  user.receivedRequestsToAddFriendCacheData = user.receivedRequestsToAddFriendCacheData.filter(
    (receivedRequestUser) => receivedRequestUser._id !== sender._id
  );
  user.friendsCacheData = user.friendsCacheData
    ? [{ ...sender }, ...user.friendsCacheData]
    : [{ ...sender }];
    console.log(user)
  return userVar(user);
};


