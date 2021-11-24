import {
  currentChatVar,
  numberOfConversationsVar,
  friendsVar,
  messagesStorageVar,
  contactVar,
} from '../cache';
import { initialState } from '../initialState';
export const setCurrentChat = (userOrGroup) =>
  currentChatVar({ ...userOrGroup });

export const setNumberOfConversations = (number) =>
  numberOfConversationsVar(number);

/**
 * {user} Object
 */

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

export const clearCurrentChat = () =>
  currentChatVar(initialState.currentUserChat);

export const addNewConversationToMessagesStorage = (key, value) => {
  const storage = { ...messagesStorageVar() };
  return messagesStorageVar({ ...storage, [key]: { ...value } });
};

export const setInitialMessagesStorage = (data) =>
  messagesStorageVar({ ...data });

export const setMessagesStorage = (
  conversation,
  message,
  scope,
  hasSeenLatestMessage = false
) => {
  const storage = { ...messagesStorageVar() };

  return messagesStorageVar({
    ...storage,
    [conversation._id]: {
      profile: { ...conversation },
      messages: storage[conversation._id]
        ? [...storage[conversation._id].messages, { ...message }]
        : [{ ...message }],
      scope,
      latestMessage: { ...message },
      hasSeenLatestMessage,
    },
  });
};

export const updateHasSeenLatestMessage = (conversationId) => {
  const storage = { ...messagesStorageVar() };
  return messagesStorageVar({
    ...storage,
    [conversationId]: {
      ...storage[conversationId],
      hasSeenLatestMessage: true,
    },
  });
};

export const updateMessagesStorage = (
  messenger,
  updatedMessage,
  scope,
  hasSeenLatestMessage
) => {
  const storage = { ...messagesStorageVar() };
  return messagesStorageVar({
    ...storage,
    [messenger._id]: {
      profile: { ...messenger },
      messages: storage[messenger._id].messages.map((message) => {
        if (message._id === updatedMessage._id) {
          return { ...updatedMessage };
        }
        return { ...message };
      }),
      scope,
      latestMessage: updatedMessage,
      hasSeenLatestMessage,
    },
  });
};

export const updateMessagesStorageToReceivedWhenUserOnline = (
  conversationId
) => {
  const storage = { ...messagesStorageVar() };
  if (storage[conversationId]) {
    return messagesStorageVar({
      ...storage,
      [conversationId]: {
        ...storage[conversationId],
        messages: storage[conversationId].messages.map((message) => {
          let __message = { ...message };
          if (message.receiverStatus === 'SENT') {
            __message.receiverStatus = 'DELIVERED';
          }
          return { ...__message };
        }),
      },
    });
  }
};
export const updateMessagesStorageWhenReceiverSeenAllMessages = (
  conversationId
) => {
  const storage = { ...messagesStorageVar() };
  return setMessagesStorage({
    ...storage,
    [conversationId]: {
      ...storage[conversationId],
      messages: storage[conversationId].messages.map((message) => {
        if (message.receiver._id === conversationId) {
          return { ...message, receiverStatus: 'SEEN' };
        }
        return { ...message };
      }),
      hasSeenLatestMessage: true,
    },
  });
};

export const updateMoreMessages = (conversationsId, newMessages) => {
  const storage = { ...messagesStorageVar() };
  return messagesStorageVar({
    ...storage,
    [conversationsId]: {
      ...storage[conversationsId],
      messages: [...newMessages, ...storage[conversationsId].messages],
    },
  });
};

export const clearMessageStorage = () =>
  messagesStorageVar(initialState.messagesStorage);
