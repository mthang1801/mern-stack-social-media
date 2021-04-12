const setCurrentPersonalUser = (setCurrentPersonalUserVar) => (user) =>{  
  if(user){
    setCurrentPersonalUserVar({...user});
  }else{
    setCurrentPersonalUserVar(null);
  }
}
  

export default setCurrentPersonalUser;
