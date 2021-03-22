/**
 *
 * @param user userInfo
 */
const setCurrentChat = (setCurrentChatVar) => (userOrGroup) =>
  setCurrentChatVar({ ...userOrGroup });

export default setCurrentChat;
