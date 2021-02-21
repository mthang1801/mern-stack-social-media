const setPersonalUsers = (setPersonalUsersVar) => (user) => setPersonalUsersVar({...setPersonalUsersVar(), [user.slug] : { ...user } });


export default setPersonalUsers;
