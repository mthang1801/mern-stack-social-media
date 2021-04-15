const updateLikePost = postsVar => (postId, userId) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map(post => {
    if(post._id === postId){
      let _post = {...post} ;
      _post.likes = [..._post.likes, userId];
      return {..._post};
    }
    return {...post};
  })
  return postsVar(updatedPosts);
}

export default updateLikePost