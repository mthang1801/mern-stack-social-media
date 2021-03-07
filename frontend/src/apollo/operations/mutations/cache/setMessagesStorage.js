/**
 *
 * @param {receiverId} ID
 * @param {newMessage} String
 */
const setMessagesStorage = (setMessagesStorageVar) => (
  receiverId,
  newMessage
) =>
  setMessagesStorageVar({
    ...setMessagesStorageVar(),
    [receiverId]: setMessagesStorageVar()[receiverId]
      ? [...setMessagesStorageVar()[receiverId], newMessage]
      : [newMessage],
  });

export default setMessagesStorage;
