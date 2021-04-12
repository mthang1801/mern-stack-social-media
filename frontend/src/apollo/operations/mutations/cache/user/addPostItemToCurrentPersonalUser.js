const addPostItemToCurrentPersonalUser = setCurrentPersonalUserVar => post => {
  const currentUser = {...setCurrentPersonalUserVar()};
  if(currentUser.postsData){
    currentUser.postsData = [{...post},...currentUser.postsData];
  }else{
    currentUser.postsData = [{...post}]
  }
  return setCurrentPersonalUserVar(currentUser)
}

export default addPostItemToCurrentPersonalUser