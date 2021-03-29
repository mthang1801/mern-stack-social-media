const updateUnlikePost = setPostsVar => (postId, userId) => {
  const posts = [...setPostsVar()];
  const updatedPosts = posts.map(post => {
    if(post._id === postId){
      let _post = {...post} ;
      _post.likes = _post.likes.filter(_id => _id !== userId);
      return {..._post};
    }
    return {...post};
  })
  return setPostsVar(updatedPosts);
}

export default updateUnlikePost;