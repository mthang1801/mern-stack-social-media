const decreaseCountNumberNotificationsUnseen = setCountNumberNotificationsUnseenVar => () => {
  const currentNumber = setCountNumberNotificationsUnseenVar();
  return setCountNumberNotificationsUnseenVar(currentNumber - 1) ;
}

export default decreaseCountNumberNotificationsUnseen