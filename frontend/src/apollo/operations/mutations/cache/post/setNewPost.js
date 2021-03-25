import { setPostsVar } from "../../../../cache";

const setNewPost = setPostsVar => newPost => {
  const posts = {...setPostsVar()}
  const postAuthorId = newPost.author._id ; 
  if(!postAuthorId || (postAuthorId && !posts[postAuthorId])){
    return false; 
  }
  return setPostsVar({...posts, [postAuthorId] : [{...newPost}, ...posts[postAuthorId]]})
}

export default setNewPost 