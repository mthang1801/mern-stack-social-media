const updateMessageStorageWhenReceiverHasSeenAllMessages = (
  setMessagesStorageVar
) => (conversationId) =>
  setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [conversationId]: {
      ...setMessagesStorageVar()[conversationId],
      messages: setMessagesStorageVar()[conversationId].messages.map(
        (message) => {
          if (message.receiver._id === conversationId) {
            return { ...message, receiverStatus: "SEEN" };
          }
          return { ...message };
        }
      ),
      hasSeenLatestMessage: true,
    },
  });

export default updateMessageStorageWhenReceiverHasSeenAllMessages;
