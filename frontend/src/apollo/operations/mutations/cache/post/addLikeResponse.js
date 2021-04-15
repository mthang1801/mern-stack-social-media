const addLikeResponse = postsVar => (postId, commentId, responseId, userId) => {
  const posts = [...postsVar()];
  const findPostByPostId = posts.find(post => post._id === postId); 
  if(!findPostByPostId || findPostByPostId && !findPostByPostId.commentsData) return; 
  const findCommentsDataByCommentId = findPostByPostId.commentsData.find(comment => comment._id === commentId);
  if(!findCommentsDataByCommentId || findCommentsDataByCommentId && !findCommentsDataByCommentId.responsesData) return ; 
  const findResponsesByResponseId = findCommentsDataByCommentId.responsesData.find(response => response._id === responseId);
  if(!findResponsesByResponseId) return ; 
  
  const updatedPost = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId ){      
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment};
        if(_comment._id === commentId){         
          _comment.responsesData = _comment.responsesData.map(response => {
            let _response = {...response};
            if(_response._id === responseId){
              _response.likes = [userId, ..._response.likes];
            }
            return {..._response};
          })
        }
        return {..._comment};
      })
    }
    return {..._post};
  })

  return postsVar(updatedPost);
}

export default addLikeResponse;