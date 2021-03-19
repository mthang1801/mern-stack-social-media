const updateUserOnlineOfflineMessagesStorage = setMessagesStorageVar => (userId, isOnline = true) => {
  const storage = {...setMessagesStorageVar()};
  const checkUserExistedInStore = storage[userId];
  if(checkUserExistedInStore){
    return setMessagesStorageVar({
      ...storage, 
      [userId] : {
        ...storage[userId],
        profile : {
          ...storage[userId].profile, 
          isOnline,
          offlinedAt : isOnline ? null : new Date()
        }
      }
    })
  }
}

export default updateUserOnlineOfflineMessagesStorage