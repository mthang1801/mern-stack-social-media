

const setNewPost = setPostsVar => newPost => {
  const posts = {...setPostsVar()}
  
  return setPostsVar([...newPost, ...posts])
}

export default setNewPost 