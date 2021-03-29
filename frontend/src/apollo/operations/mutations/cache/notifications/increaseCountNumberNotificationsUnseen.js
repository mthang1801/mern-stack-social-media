const increaseCountNumberNotificationsUnseen = setCountNumberNotificationsUnseenVar => () => {
  const currentNumber = setCountNumberNotificationsUnseenVar();
  return setCountNumberNotificationsUnseenVar(currentNumber + 1) ;
}

export default increaseCountNumberNotificationsUnseen