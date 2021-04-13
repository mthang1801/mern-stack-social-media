const setCurrentUser = setCurrentUserVar => user => {
  console.log(user);
  setCurrentUserVar(user);
}

export default setCurrentUser