const updatePost = setPostsVar => editedPost => {
  const posts = [...setPostsVar()];
 console.log(posts)
 console.log(editedPost)
  if(posts.some(post => post._id === editedPost._id)){
    const updatedPost = posts.map(post => {
      let _post = {...post};
      if(_post._id === editedPost._id){
        return {..._post, ...editedPost};
      }
      return {..._post};
    })
    return setPostsVar(updatedPost);
  }
}

export default updatePost;