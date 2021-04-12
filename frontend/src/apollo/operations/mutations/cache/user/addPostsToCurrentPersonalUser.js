const addPostsToCurrentPersonalUser = setCurrentPersonalUserVar => posts => {
  const currentUser = {...setCurrentPersonalUserVar()};
  if(currentUser.postsData){
    currentUser.postsData = [...currentUser.postsData, ...posts];
  }else{
    currentUser.postsData = [...posts];
  }
  return setCurrentPersonalUserVar(currentUser)
}

export default addPostsToCurrentPersonalUser