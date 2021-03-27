const setLatestNotification = (setLatestNotificationVar) => (
  latestNotification
) => {
  if(latestNotification){
    return setLatestNotificationVar({ ...latestNotification });
  }
  return setLatestNotificationVar(latestNotification)
}

export default setLatestNotification;
