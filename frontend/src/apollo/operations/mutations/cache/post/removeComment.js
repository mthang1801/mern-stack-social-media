const removeComment = setPostsVar => (postId, commentId) => {
  const posts = [...setPostsVar()]; 
  const updatedPosts = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId){
      _post.comments = _post.comments.filter(_id => _id !== commentId);
      _post.commentsData = _post.commentsData.filter(comment => comment._id !== commentId);
    }
    return {..._post};
  })
  return setPostsVar(updatedPosts);
  
};

export default removeComment ; 