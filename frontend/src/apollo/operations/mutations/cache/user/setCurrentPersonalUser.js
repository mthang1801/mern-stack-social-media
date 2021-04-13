const setCurrentPersonalUser = (setCurrentPersonalUserVar) => (user) =>{
  console.log(user)
  return setCurrentPersonalUserVar(user);
}
  

export default setCurrentPersonalUser;
