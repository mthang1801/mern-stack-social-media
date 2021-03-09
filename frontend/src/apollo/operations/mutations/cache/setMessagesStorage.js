const setMessagesStorage = (setMessagesStorageVar) => (
  messenger,
  message,
  status,
  hasSeenLatestMessage = false
) => {
  return setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [messenger._id]: {
      profile: { ...messenger },
      messages: setMessagesStorageVar()[messenger._id]
        ? [...setMessagesStorageVar()[messenger._id].messages, { ...message }]
        : [{ ...message }],
      status,
      latestMessage: +message.createdAt,
      hasSeenLatestMessage,
    },
  });
};

export default setMessagesStorage;
