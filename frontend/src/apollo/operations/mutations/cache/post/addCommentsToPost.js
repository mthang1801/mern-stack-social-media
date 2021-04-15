const addCommentsToPost = postsVar => (postId, newComments) => {
  const posts = [...postsVar()];
  const post = posts.find(postItem => postItem._id === postId);
  if(post){  
    const updatedPosts = posts.map(post => {
      let _post = {...post}; 
      if(_post._id === postId){        
        _post.commentsData =  _post.commentsData ? [..._post.commentsData, ...newComments] : [...newComments];
      }
      return {..._post}; 
    })
    return postsVar(updatedPosts);
  }
}

export default addCommentsToPost ;