/**
 *
 * @param user userInfo
 */
const setCurrentChatUser = (setCurrentChatUserVar) => (user) =>
  setCurrentChatUserVar({ ...user });

export default setCurrentChatUser;
