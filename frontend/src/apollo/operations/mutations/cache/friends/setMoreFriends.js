const setMoreFriends = setFriendsVar => friends => {
  const prevFriends = [...setFriendsVar()];
  return setFriendsVar([...prevFriends, ...friends])
}

export default setMoreFriends;