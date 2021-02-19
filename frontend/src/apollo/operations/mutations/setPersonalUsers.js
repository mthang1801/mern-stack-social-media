const setPersonalUsers = (setPersonalUsersVar) => (user) => {
  if (user.slug) {    
    setPersonalUsersVar({...setPersonalUsersVar, [user.slug] : { ...user } });
  }
};

export default setPersonalUsers;
