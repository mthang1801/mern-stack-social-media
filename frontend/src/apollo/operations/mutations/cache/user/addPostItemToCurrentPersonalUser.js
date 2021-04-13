const addPostItemToCurrentPersonalUser = setCurrentPersonalUserVar => post => {
  
  let currentUser = {...setCurrentPersonalUserVar()};
  if(currentUser.postsData?.length){
    currentUser.postsData = [{...post},...currentUser.postsData];
  }else{
    currentUser.postsData = [{...post}]
  }
  
  return setCurrentPersonalUserVar(currentUser)
}

export default addPostItemToCurrentPersonalUser