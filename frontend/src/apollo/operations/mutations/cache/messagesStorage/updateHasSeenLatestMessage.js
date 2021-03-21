const updateHasSeenLatestMessage = (setMessagesStorageVar) => (
  conversationId
) =>
  setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [conversationId]: {
      ...setMessagesStorageVar()[conversationId],
      hasSeenLatestMessage: true,
    },
  });

export default updateHasSeenLatestMessage;
