import { userVar } from "../cache";

export const addFetchedFriendsToFriendsData = (fetchedFriends) => {
  const user = { ...userVar() };
  user.friendsData = user.friendsData
    ? [...user.friendsData, ...fetchedFriends]
    : [...fetchedFriends];
  return userVar(user);
  
};

export const setCurrentUser = user => userVar(user);

export const setUserFriendsData = friends => {
  const user = {...userVar()};
  if(user.contact?.friendsData){
    user.contact.friendsData = [...friends];
  }
  return userVar({...user});
}

