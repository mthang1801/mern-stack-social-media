const addResponsesToComment = (setPostsVar) => (
  postId,
  commentId,
  responses
) => {
  const posts = [...setPostsVar()];
  const updatedPosts = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId && _post.commentsData) {      
      _post.commentsData =  _post.commentsData.map((comment) => {              
        let _comment = { ...comment };
        if (_comment._id === commentId) {                          
          _comment.responsesData = _comment.responsesData
            ? [..._comment.responsesData, ...responses]
            : [...responses];          
        }        
        return { ..._comment };
      });
    }
    return { ..._post };
  });
  return setPostsVar([...updatedPosts]);
};

export default addResponsesToComment;
