const updateMessagesStorage = (setMessagesStorageVar) => (
  messenger,
  updatedMessage,
  scope,
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
      scope,
      latestMessage: updatedMessage,
      hasSeenLatestMessage,
    },
  });

export default updateMessagesStorage;
