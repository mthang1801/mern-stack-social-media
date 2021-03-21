const addNewConversationToMessagesStorage = (setMessagesStorageVar) => (
  key,
  value
) => {
  const storage = { ...setMessagesStorageVar() };
  return setMessagesStorageVar({ ...storage, [key]: { ...value } });
};

export default addNewConversationToMessagesStorage;
