import { setMessagesStorageVar } from "../../../cache";

/**
 *
 * @param {messenger} Object user or group profile
 * @param {newMessage} Object messages
 * @param {type} String PRIVATE or GROUP
 */
const setMessagesStorage = (setMessagesStorageVar) => (
  messenger,
  newMessage,
  type = "PRIVATE"
) => {
  if (type !== "GROUP" || type !== "PRIVATE") {
    return false;
  }
  if (messenger && messenger._id) {
    const checkMessengerExisted = setMessagesStorageVar()[messenger._id];
    let updateNewMessage;
    if (checkMessengerExisted) {
      updateNewMessage = {
        ...checkMessengerExisted,
        messages: [...checkMessengerExisted.messages, {...newMessage}],
      };
    } else {
      updateNewMessage = {
        profile: messenger,
        messages: [{...newMessage}],
        type,
      };
    }

    return setMessagesStorageVar({
      ...setMessagesStorageVar(),
      [messenger._id]: {...updateNewMessage},
    });
  }
  return false;
};

export default setMessagesStorage;
