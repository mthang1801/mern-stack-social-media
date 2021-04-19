import {
  currentChatVar,
  numberOfConversationsVar,
  friendsVar,
  messagesStorageVar,
} from "../cache";
import {initialState} from "../initialState"
export const setCurrentChat = (userOrGroup) =>
  currentChatVar({ ...userOrGroup });

export const setNumberOfConversations = (number) =>
  numberOfConversationsVar(number);

/**
 * {user} Object
 */
export const updateUserOnlineOffline = (user, isOnline = true) => {
  let friends = [...friendsVar()];
  if (typeof isOnline === "boolean") {
    if (isOnline) {
      //update user is online
      if (
        friends.find((friend) => friend._id.toString() === user._id.toString())
      ) {
        friends = friends.filter(
          (friend) => friend._id.toString() !== user._id.toString()
        );
      }
      return friendsVar([{ ...user }, ...friends]);
    }
    //update user is Offline
    const { _id } = user;
    if (_id) {
      friends = friends.map((friend) => {
        let updatedFriends = { ...friend };
        if (updatedFriends._id.toString() === _id.toString()) {
          updatedFriends.isOnline = false;
          updatedFriends.offlinedAt = new Date();
        }
        return { ...updatedFriends };
      });
      return friendsVar([...friends]);
    }
  }
  return friendsVar([...friendsVar()]);
};

export const updateUserOnlineOfflineMessagesStorage = (
  userId,
  isOnline = true
) => {
  const storage = { ...messagesStorageVar() };
  const checkUserExistedInStore = storage[userId];
  if (checkUserExistedInStore) {
    return messagesStorageVar({
      ...storage,
      [userId]: {
        ...storage[userId],
        profile: {
          ...storage[userId].profile,
          isOnline,
          offlinedAt: isOnline ? null : new Date(),
        },
      },
    });
  }
};


export const clearCurrentChat =  () => currentChatVar(initialState.currentUserChat);
