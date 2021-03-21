const setSentRequestsToAddFriend = (setSentRequestsToAddFriendVar) => (
  receiversRequest
) => setSentRequestsToAddFriendVar([...receiversRequest]);

export default setSentRequestsToAddFriend;
