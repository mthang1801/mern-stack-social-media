/**
 * {user} Object
 */
const updateUserOnlineOffline = (setFriendsVar) => (user, isOnline = true) => {
  let friends = [...setFriendsVar()];
  if (typeof isOnline === "boolean") {
    if (isOnline) {
      //update user is online
      if (
        friends.find((friend) => friend._id.toString() === user._id.toString())
      ) {
        friends = friends.filter(
          (friend) => friend._id.toString() !== user._id.toString()
        );
      }
      return setFriendsVar([{ ...user }, ...friends]);
    }
    //update user is Offline
    const { _id } = user;
    if (_id) {
      friends = friends.map((friend) => {
        let updatedFriends = { ...friend };
        if (updatedFriends._id.toString() === _id.toString()) {
          updatedFriends.isOnline = false;
          updatedFriends.offlinedAt = new Date();
        }
        return { ...updatedFriends };
      });
      return setFriendsVar([...friends]);
    }
  }
  return setFriendsVar([...setFriendsVar()]);
};

export default updateUserOnlineOffline;
