const addCommentToPost = setPostsVar => (postId, newComment) => {
  const posts = [...setPostsVar()];
  const updatedPosts = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId){
      _post.comments = [newComment._id, ..._post.comments];      
      _post.commentsData = _post.commentsData ? [{...newComment}, ..._post.commentsData] : [{...newComment}];
    }
    return {..._post};
  })
  return setPostsVar(updatedPosts);
}

export default addCommentToPost