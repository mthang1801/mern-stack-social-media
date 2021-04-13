const updatePostInCurrentPersonalUser = setCurrentPersonalUserVar => editedPost => {
  let currentUser = {...setCurrentPersonalUserVar()};
  console.log(currentUser);
  console.log(editedPost);
  console.log(currentUser.postsData?.some(post => post._id === editedPost._id))
  if(currentUser.postsData?.some(post => post._id === editedPost._id)){
    const updatedPosts = currentUser.postsData.map(post => {
      let _post = {...post};
      if(_post._id === editedPost._id){
       
        return {..._post, ...editedPost};
      }
      return {..._post};
    })

    return setCurrentPersonalUserVar({...currentUser , postsData : updatedPosts});
  }
}

export default updatePostInCurrentPersonalUser;