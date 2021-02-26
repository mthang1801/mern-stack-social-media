const setReceivedRequestsToAddFriend = (setReceivedRequestsToAddFriendVar) => (
  senderRequest
) => setReceivedRequestsToAddFriendVar([...senderRequest]);

export default setReceivedRequestsToAddFriend;
