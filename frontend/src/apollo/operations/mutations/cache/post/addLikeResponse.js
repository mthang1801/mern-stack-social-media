const addLikeResponse = setPostsVar => (postId, commentId, responseId, userId) => {
  const posts = [...setPostsVar()];
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

  return setPostsVar(updatedPost);
}

export default addLikeResponse;