const updateMoreMessages = (setMessagesStorageVar) => (
  conversationsId,
  newMessages
) =>
  setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [conversationsId]: {
      ...setMessagesStorageVar()[conversationsId],
      messages: [
        ...newMessages,
        ...setMessagesStorageVar()[conversationsId].messages,
      ],
    },
  });


export default updateMoreMessages;