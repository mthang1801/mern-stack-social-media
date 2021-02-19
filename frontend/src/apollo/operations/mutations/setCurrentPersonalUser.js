const setCurrentPersonalUser = setCurrentPersonalUserVar => user => {
  if(typeof user === "object"){
    setCurrentPersonalUserVar({...user})
  }
  return null;
}

export default setCurrentPersonalUser

