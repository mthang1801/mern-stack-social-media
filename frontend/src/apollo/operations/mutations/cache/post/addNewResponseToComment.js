const addNewResponseToPost = (setPostsVar) => (
  postId,
  commentId,
  newResponse
) => {
  const posts = [...setPostsVar()];
  const currentPost = posts.find((post) => post._id === postId);
  if (currentPost) {
    const currentComment = currentPost.comments.find(
      (comment) => comment._id === commentId
    );
    if (currentComment) {
      const updatedPosts = posts.map((post) => {
        let _post = { ...post };
        if (_post._id === postId) {
          _post.comments = _post.map((comment) => {
            let _comment = { ...comment };
            if (_comment._id === commentId) {
              _comment = {
                ..._comment,
                responses: [{ ...newResponse }, _comment.responses],
              };
            }
            return { ..._comment };
          });
        }
        return { ..._post };
      });
      return setPostsVar(updatedPosts);
    }
  }
};

export default addNewResponseToPost