const addCommentToOwnerPost = setPersonalPostsVar => (userId, newComment) => {
  let personalPosts = {...setPersonalPostsVar()};
  if(personalPosts[userId]){
    let personalPostByUserId = personalPosts[userId];
    let post = personalPostByUserId.find(postItem => postItem._id.toString() === newComment.post.toString());    
    if(post){
      let updatedPost = {...post, comments : [{...newComment}, ...post.comments]}
      return setPersonalPostsVar({...personalPosts, [userId] : updatedPost})
    }    
  }
}

export default addCommentToOwnerPost