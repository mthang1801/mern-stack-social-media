const setMessagesStorage = (setMessagesStorageVar) => (
  conversation,
  message,
  scope,
  hasSeenLatestMessage = false
) => {
  return setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [conversation._id]: {
      profile: { ...conversation },
      messages: setMessagesStorageVar()[conversation._id]
        ? [...setMessagesStorageVar()[conversation._id].messages, { ...message }]
        : [{ ...message }],
      scope,
      latestMessage : {...message},      
      hasSeenLatestMessage,
    },
  });
};

export default setMessagesStorage;
