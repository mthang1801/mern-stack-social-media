const addCommentToPost = postsVar => (postId, newComment) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId){
      _post.comments = [newComment._id, ..._post.comments];      
      _post.commentsData = _post.commentsData ? [{...newComment}, ..._post.commentsData] : [{...newComment}];
    }
    return {..._post};
  })
  return postsVar(updatedPosts);
}

export default addCommentToPost