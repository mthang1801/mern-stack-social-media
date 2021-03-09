const updateMessagesStorage = (setMessagesStorageVar) => (
  messenger,
  updatedMessage,
  status,
  hasSeenLatestMessage
) =>
  setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [messenger._id]: {
      profile: { ...messenger },
      messages: setMessagesStorageVar()[messenger._id].messages.map(
        (message) => {
          if (message._id === updatedMessage._id) {
            return { ...updatedMessage };
          }
          return { ...message };
        }
      ),
      status,
      latestMessage: updatedMessage,
      hasSeenLatestMessage,
    },
  });

export default updateMessagesStorage;
