const addPostsToCurrentPersonalUser = setCurrentPersonalUserVar => posts => {
  let currentUser = {...setCurrentPersonalUserVar()};
  if(currentUser.postsData?.length){
    currentUser.postsData = [...currentUser.postsData, ...posts];
  }else{
    currentUser.postsData = [...posts];
  }
  return setCurrentPersonalUserVar(currentUser)
}

export default addPostsToCurrentPersonalUser