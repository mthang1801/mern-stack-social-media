const updatePost = postsVar => editedPost => {
  const posts = [...postsVar()];
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
    return postsVar(updatedPost);
  }
}

export default updatePost;