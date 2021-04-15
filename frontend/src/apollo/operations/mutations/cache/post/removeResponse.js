const removeResponse = (postsVar) => (postId, commentId, responseId) => {
  const posts = [...postsVar()];
  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.responses = _post.responses.filter((_id) => _id !== responseId);
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.responses = _comment.responses.filter(
            (_id) => _id !== responseId
          );
          _comment.responsesData = _comment.responsesData.filter(
            (responseItem) => responseItem._id !== responseId
          );
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });

  return postsVar(updatedPost);
};

export default removeResponse;
