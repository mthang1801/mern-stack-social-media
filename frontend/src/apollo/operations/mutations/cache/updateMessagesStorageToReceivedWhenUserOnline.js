const updateMessagesStorageWhenUserOnline = (setMessagesStorageVar) => (
  conversationId
) => {
  const storage = { ...setMessagesStorageVar() };
  if (storage[conversationId]) {
    return setMessagesStorageVar({
      ...storage,
      [conversationId]: {
        ...storage[conversationId],
        messages : storage[conversationId].messages.map(message => {
          let __message = {...message}; 
          if(message.receiverStatus === "SENT"){
            __message.receiverStatus = "DELIVERED"
          }
          return {...__message}
        })
      },
    });
  }
};

export default updateMessagesStorageWhenUserOnline;
