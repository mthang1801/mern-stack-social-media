import { postsVar, currentPersonalUserVar } from '../cache';
import { initialState } from '../initialState';

//#region Home Post
export const addFetchedPostToCache = (fetchedPosts) => {
  const posts = [...postsVar()];
  if (!Array.isArray(fetchedPosts)) {
    return false;
  }
  console.log([...posts, ...fetchedPosts]);
  return postsVar([...posts, ...fetchedPosts]);
};

export const pushNewPostToPostsList = (newPost) => {
  const posts = [...postsVar()];
  return postsVar([{ ...newPost }, ...posts]);
};

export const addCommentsToPost = (postId, newComments) => {
  const posts = [...postsVar()];
  const post = posts.find((postItem) => postItem._id === postId);
  if (post) {
    const updatedPosts = posts.map((post) => {
      let _post = { ...post };
      if (_post._id === postId) {
        _post.commentsData = _post.commentsData
          ? [..._post.commentsData, ...newComments]
          : [...newComments];
      }
      return { ..._post };
    });
    return postsVar(updatedPosts);
  }
};

export const addCommentToPost = (postId, newComment) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.comments = [newComment._id, ..._post.comments];
      _post.commentsData = _post.commentsData
        ? [{ ...newComment }, ..._post.commentsData]
        : [{ ...newComment }];
    }
    return { ..._post };
  });
  return postsVar(updatedPosts);
};

export const addLikeComment = (postId, commentId, userId) => {
  const posts = [...postsVar()];
  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId && _post.commentsData) {
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.likes = [...new Set([userId, ..._comment.likes])];
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });
  return postsVar(updatedPost);
};

export const addLikeResponse = (postId, commentId, responseId, userId) => {
  const posts = [...postsVar()];
  const findPostByPostId = posts.find((post) => post._id === postId);
  if (!findPostByPostId || (findPostByPostId && !findPostByPostId.commentsData))
    return;
  const findCommentsDataByCommentId = findPostByPostId.commentsData.find(
    (comment) => comment._id === commentId
  );
  if (
    !findCommentsDataByCommentId ||
    (findCommentsDataByCommentId && !findCommentsDataByCommentId.responsesData)
  )
    return;
  const findResponsesByResponseId =
    findCommentsDataByCommentId.responsesData.find(
      (response) => response._id === responseId
    );
  if (!findResponsesByResponseId) return;

  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.responsesData = _comment.responsesData.map((response) => {
            let _response = { ...response };
            if (_response._id === responseId) {
              _response.likes = [userId, ..._response.likes];
            }
            return { ..._response };
          });
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });

  return postsVar(updatedPost);
};

export const addNewResponseToComment = (postId, commentId, newResponse) => {
  const posts = [...postsVar()];
  const specificPost = posts.find((post) => post._id === postId);
  if (!specificPost || !specificPost.commentsData) return;
  const specificCommentsData = specificPost.commentsData.find(
    (commentItem) => commentItem._id === commentId
  );
  if (!specificCommentsData) return;

  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.responses = [newResponse._id, ..._post.responses];
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.responses = [newResponse._id, ..._comment.responses];
          _comment.responsesData = _comment.responsesData
            ? [{ ...newResponse }, ..._comment.responsesData]
            : [{ ...newResponse }];
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });
  return postsVar(updatedPost);
};

export const addResponsesToComment = (postId, commentId, responses) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId && _post.commentsData) {
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.responsesData = _comment.responsesData
            ? [..._comment.responsesData, ...responses]
            : [...responses];
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });
  return postsVar([...updatedPosts]);
};

export const removeComment = (postId, commentId) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.comments = _post.comments.filter((_id) => _id !== commentId);
      let commentToRemove = _post.commentsData.find(
        (comment) => comment._id === commentId
      );
      _post.commentsData = _post.commentsData.filter(
        (comment) => comment._id !== commentId
      );
      _post.responses = _post.responses.filter(
        (responseId) => !commentToRemove.responses.includes(responseId)
      );
    }
    return { ..._post };
  });
  return postsVar(updatedPosts);
};

export const removeLikeComment = (postId, commentId, userId) => {
  const posts = [...postsVar()];
  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId && _post.commentsData) {
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.likes = _comment.likes.filter((_id) => _id !== userId);
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });
  return postsVar(updatedPost);
};

export const removeLikeResponse = (postId, commentId, responseId, userId) => {
  const posts = [...postsVar()];

  const findPostByPostId = posts.find((post) => post._id === postId);
  if (!findPostByPostId || (findPostByPostId && !findPostByPostId.commentsData))
    return;
  const findCommentsDataByCommentId = findPostByPostId.commentsData.find(
    (comment) => comment._id === commentId
  );
  if (
    !findCommentsDataByCommentId ||
    (findCommentsDataByCommentId && !findCommentsDataByCommentId.responsesData)
  )
    return;
  const findResponsesByResponseId =
    findCommentsDataByCommentId.responsesData.find(
      (response) => response._id === responseId
    );
  if (!findResponsesByResponseId) return;

  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId) {
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === commentId) {
          _comment.responsesData = _comment.responsesData.map((response) => {
            let _response = { ...response };
            if (_response._id === responseId) {
              _response.likes = _response.likes.filter((_id) => _id !== userId);
            }
            return { ..._response };
          });
        }
        return { ..._comment };
      });
    }
    return { ..._post };
  });

  return postsVar(updatedPost);
};

export const removeResponse = (postId, commentId, responseId) => {
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

export const updateCommentLikes = (comment) => {
  const posts = [...postsVar()];
  const { post: postId } = comment;
  //find post contain comment
  const post = posts.find((post) => post._id === postId);
  //check post has commentsData and comment is currently whether contained in post or not
  if (
    post.commentsData &&
    post?.commentsData.some((commentData) => commentData._id === comment._id)
  ) {
    const updatedPosts = posts.map((postItem) => {
      let _post = { ...postItem };
      if (_post._id === comment.post) {
        _post.commentsData = _post.commentsData.map((commentItem) => {
          let _comment = { ...commentItem };
          if (_comment._id === comment._id) {
            _comment.likes = [...new Set(comment.likes)];
          }
          return { ..._comment };
        });
      }
      return { ..._post };
    });
    return postsVar(updatedPosts);
  }
};

export const updateLikePost = (postId, userId) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map((post) => {
    if (post._id.toString() === postId.toString()) {
      return {
        ...post,
        likes: [...new Set([...post.likes, userId])],
      };
    }
    return post;
  });
  return postsVar(updatedPosts);
};

export const updatePost = (editedPost) => {
  const posts = [...postsVar()];
  if (posts.some((post) => post._id === editedPost._id)) {
    const updatedPost = posts.map((post) => {
      let _post = { ...post };
      if (_post._id === editedPost._id) {
        return { ..._post, ...editedPost };
      }
      return { ..._post };
    });
    return postsVar(updatedPost);
  }
};

export const updateRemoveLikePost = (postId, userId) => {
  const posts = [...postsVar()];
  console.log(postId, userId);
  console.log(posts);
  const updatedPosts = posts.map((post) => {
    if (post._id === postId) {
      return {
        ...post,
        likes: post.likes.filter((like) => like === userId),
      };
    }
    return post;
  });
  console.log(updatedPosts);
  return postsVar(updatedPosts);
};

export const clearPosts = () => postsVar(initialState.posts);
//#endregion

//#region current Personal User

export const addPostItemToCurrentPersonalUser = (post) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser.postsData?.length) {
    currentUser.postsData = [{ ...post }, ...currentUser.postsData];
  } else {
    currentUser.postsData = [{ ...post }];
  }
  return currentPersonalUserVar(currentUser);
};

export const addPostsToCurrentPersonalUser = (posts) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser.postsData?.length) {
    currentUser.postsData = [...currentUser.postsData, ...posts];
  } else {
    currentUser.postsData = [...posts];
  }
  return currentPersonalUserVar(currentUser);
};

export const updatePostInCurrentPersonalUser = (editedPost) => {
  let currentUser = { ...currentPersonalUserVar() };

  if (currentUser.postsData?.some((post) => post._id === editedPost._id)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      let _post = { ...post };
      if (_post._id === editedPost._id) {
        return { ..._post, ...editedPost };
      }
      return { ..._post };
    });

    return currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};

export const userLikePost = (likedPost) => {
  console.log(likedPost);
  // at current personal user
  let currentUser = { ...currentPersonalUserVar() };

  if (currentUser.postsData?.some((post) => post._id === likedPost._id)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      let _post = { ...post };
      if (_post._id === likedPost._id) {
        return { ..._post, ...likedPost };
      }
      return { ..._post };
    });
    currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
  // at home page
  const posts = postsVar();
  if (posts.some((post) => post._id === likedPost._id)) {
    const updatedPosts = posts.map((post) => {
      if (post._id === likedPost._id) {
        return { ...post, ...likedPost };
      }
      return post;
    });
    postsVar(updatedPosts);
  }
};

export const userRemoveLikePost = (userId, postId) => {
  // At current personal user page
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser.postsData?.some((post) => post._id === postId)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      let _post = { ...post };
      if (_post._id === postId) {
        return {
          ..._post,
          likes: _post.likes.filter((like) => like !== userId),
        };
      }
      return { ..._post };
    });
    currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }

  // at home page
  const posts = postsVar();
  const updatedPosts = posts.map((post) => {
    console.log(post);
    if (post._id === postId) {
      return {
        ...post,
        likes: post.likes.filter((like) => like !== userId),
      };
    }
    return post;
  });

  postsVar(updatedPosts);
};

export const addCommentsToPostInPersonalUser = (postId, comments) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser?.postsData?.some((post) => post._id === postId)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      let _post = { ...post };
      if (_post._id === postId) {
        return {
          ..._post,
          commentsData: _post.commentsData
            ? [..._post.commentsData, ...comments]
            : [...comments],
        };
      }
      return { ..._post };
    });
    return currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};

export const addResponsesToCommentInPersonalUser = (
  postId,
  commentId,
  responses
) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser?.postsData?.some((post) => post._id === postId)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      if (
        post._id === postId &&
        post?.commentsData.some((comment) => comment._id === commentId)
      ) {
        const updatedComments = post.commentsData.map((comment) => {
          const _comment = { ...comment };
          if (_comment._id === commentId) {
            _comment.responsesData = _comment.responsesData
              ? [..._comment.responsesData, ...responses]
              : [...responses];
          }
          return { ..._comment };
        });
        return { ...post, commentsData: updatedComments };
      }
      return { ...post };
    });
    return currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};

//#endregion
