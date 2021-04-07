const addNewResponseToPost = (setPostsVar) => (
  postId,
  commentId,
  newResponse
) => {
  const posts = [...setPostsVar()];
  const specificPost = posts.find(post => post._id === postId)
  if(!specificPost || !specificPost.commentsData) return ; 
  const specificCommentsData = specificPost.commentsData.find(commentItem => commentItem._id === commentId);
  if(!specificCommentsData) return; 
  
  const updatedPost = posts.map(post => {
    let _post  = {...post};
    if(_post._id === postId){
      _post.responses = [newResponse._id , ..._post.responses];
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment};
        if(_comment._id === commentId){
          _comment.responses = [newResponse._id, ..._comment.responses];
          _comment.responsesData = _comment.responsesData ? [{...newResponse}, ..._comment.responsesData] : [{...newResponse}]  ;
        }
        return {..._comment}; 
      })
    }
    return {..._post};
  })
  return setPostsVar(updatedPost);
};

export default addNewResponseToPost