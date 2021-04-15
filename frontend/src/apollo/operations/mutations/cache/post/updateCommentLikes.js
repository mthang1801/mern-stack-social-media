const updateCommentLikes = postsVar => comment => {
  const posts = [...postsVar()];
  const {post : postId} = comment;  
  //find post contain comment
  const post = posts.find(post => post._id === postId);
  //check post has commentsData and comment is currently whether contained in post or not
  if(post.commentsData && post?.commentsData.some(commentData => commentData._id === comment._id )){    
      const updatedPosts = posts.map(postItem => {
        let _post = {...postItem};
        if(_post._id === comment.post){
          _post.commentsData = _post.commentsData.map(commentItem => {
            let _comment = {...commentItem};
            if(_comment._id === comment._id){              
              _comment.likes = [...new Set(comment.likes)];
            }
            return {..._comment};
          })
        }
        return {..._post};
      })
    return postsVar(updatedPosts)
  }
  
}

export default updateCommentLikes;