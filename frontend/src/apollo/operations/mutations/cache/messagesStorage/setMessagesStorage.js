const setMessagesStorage = (setMessagesStorageVar) => (
  conversation,
  message,
  scope,
  hasSeenLatestMessage = false
) => {
  const storage = {...setMessagesStorageVar()};

  return setMessagesStorageVar({
    ...storage,
    [conversation._id]: {
      profile: { ...conversation },
      messages: storage[conversation._id]
        ? [...storage[conversation._id].messages, { ...message }]
        : [{ ...message }],
      scope,
      latestMessage : {...message},      
      hasSeenLatestMessage,
    },
  });
};

export default setMessagesStorage;
