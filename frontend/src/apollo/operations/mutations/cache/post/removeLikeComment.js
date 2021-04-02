const removeLikeComment = setPostsVar => (postId, commentId, userId) => {
  const posts = [...setPostsVar()];
  const updatedPost = posts.map(post => {
    let _post = {...post}; 
    if(_post._id === postId){
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment} ; 
        if(_comment._id === commentId){
          _comment.likes  = _comment.likes.filter(_id=> _id !== userId )
        }
        return {..._comment}; 
      })
    }
    return {..._post}; 
  })
  return setPostsVar(updatedPost);
}

export default removeLikeComment;