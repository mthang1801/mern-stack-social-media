const updateLikePost = setPostsVar => (postId, userId) => {
  const posts = [...setPostsVar()];
  const updatedPosts = posts.map(post => {
    if(post._id === postId){
      let _post = {...post} ;
      _post.likes = [..._post.likes, userId];
      return {..._post};
    }
    return {...post};
  })
  return setPostsVar(updatedPosts);
}

export default updateLikePost