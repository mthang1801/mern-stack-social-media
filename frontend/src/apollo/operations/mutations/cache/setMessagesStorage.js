const setMessagesStorage = (setMessagesStorageVar) => (
  messenger,
  message,
  scope,
  hasSeenLatestMessage = false
) => {
  return setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [messenger._id]: {
      profile: { ...messenger },
      messages: setMessagesStorageVar()[messenger._id]
        ? [...setMessagesStorageVar()[messenger._id].messages, { ...message }]
        : [{ ...message }],
      scope,
      latestMessage : {...message},      
      hasSeenLatestMessage,
    },
  });
};

export default setMessagesStorage;
