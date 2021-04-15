//check if commentsData have contained comment or not
const checkCommentExistedInPosts = postsVar => comment => {
  const posts = [...postsVar()];
  const {post : postId} = comment;  
  const post = posts.find(post => post._id === postId);
  if(post.commentsData){
    return post.commentsData.some(commentData => commentData._id === comment._id );
  }
  return false;
}

export default checkCommentExistedInPosts;