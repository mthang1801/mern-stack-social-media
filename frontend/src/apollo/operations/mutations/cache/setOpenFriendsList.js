const setOpenFriendsList = setOpenFriendsListVar => (value) => {
  if(typeof value === "boolean"){
    setOpenFriendsListVar(value);
  }  
}

export default setOpenFriendsList