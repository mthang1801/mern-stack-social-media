import { userVar } from "../cache";

export const addFetchedFriendsToFriendsData = (fetchedFriends) => {
  const user = { ...userVar() };
  user.friendsData = user.friendsData
    ? [...user.friendsData, ...fetchedFriends]
    : [...fetchedFriends];
  return userVar(user);
  
};

export const setCurrentUser = user => userVar(user);

