const setSentRequestsToAddFriend = (setSentRequestsToAddFriendVar) => (
  sentUsers
) => setSentRequestsToAddFriendVar([...sentUsers]);

export default setSentRequestsToAddFriend;
