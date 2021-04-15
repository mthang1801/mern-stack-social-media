

const setNewPost = postsVar => newPost => {
  const posts = {...postsVar()}
  
  return postsVar([...newPost, ...posts])
}

export default setNewPost 