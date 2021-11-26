import { postsVar, currentPersonalUserVar } from '../cache';
import { initialState } from '../initialState';

//#region Home Post
export const addFetchedPostToCache = (fetchedPosts) => {
  const posts = [...postsVar()];
  if (!Array.isArray(fetchedPosts)) {
    return false;
  }
  return postsVar([...posts, ...fetchedPosts]);
};

export const pushNewPostToPostsList = (newPost) => {
  const posts = [...postsVar()];
  return postsVar([{ ...newPost }, ...posts]);
};

export const addCommentToPost = (newComment) => {
  const posts = [...postsVar()];
  if (posts.some((post) => post._id === newComment.post)) {
    const updatedPosts = posts.map((post) => {
      let _post = { ...post };
      if (_post._id === newComment.post) {
        _post.comments = [newComment._id, ..._post.comments];
        _post.commentsData = _post.commentsData
          ? [{ ...newComment }, ..._post.commentsData]
          : [{ ...newComment }];
      }
      return { ..._post };
    });
    postsVar(updatedPosts);
  }
  const curerntPersonalUser = currentPersonalUserVar();
  if (
    curerntPersonalUser?.postsData?.some((post) => post._id === newComment.post)
  ) {
    const updatedCurrentPostsUser = {
      ...curerntPersonalUser,
      postsData: curerntPersonalUser.postsData.map((post) => {
        let _post = { ...post };
        if (_post._id === newComment.post) {
          _post.comments = [newComment._id, ..._post.comments];
          _post.commentsData = _post.commentsData
            ? [{ ...newComment }, ..._post.commentsData]
            : [{ ...newComment }];
        }
        return { ..._post };
      }),
    };
    currentPersonalUserVar(updatedCurrentPostsUser);
  }
};

export const addLikeComment = (commentData) => {
  const posts = postsVar();

  if (posts?.some((post) => post._id === commentData.post)) {
    const updatedPosts = posts.map((post) => {
      if (post._id === commentData.post && post.commentsData) {
        return {
          ...post,
          commentsData: post.commentsData.map((comment) => {
            if (comment._id === commentData._id) {
              return { ...comment, ...commentData };
            }
            return comment;
          }),
        };
      }
      return post;
    });
    postsVar(updatedPosts);
  }

  const currentPersonalUser = currentPersonalUserVar();
  if (
    currentPersonalUser?.postsData?.some(
      (post) => post._id === commentData.post
    )
  ) {
    const updatedCurrentPersonalUser = {
      ...currentPersonalUser,
      postsData: currentPersonalUser.postsData.map((post) => {
        if (post._id === commentData.post && post.commentsData) {
          return {
            ...post,
            commentsData: post.commentsData.map((comment) => {
              if (comment._id === commentData._id) {
                return { ...comment, ...commentData };
              }
              return comment;
            }),
          };
        }
        return post;
      }),
    };

    currentPersonalUserVar(updatedCurrentPersonalUser);
  }
};

export const removeLikeComment = (commentData) => {
  // At home page
  const posts = postsVar();
  if (posts.some((post) => post._id === commentData.post)) {
    const updatedPosts = posts.map((post) => {
      if (post._id === commentData.post && post.commentsData) {
        return {
          ...post,
          commentsData: post.commentsData.map((comment) => {
            if (comment._id === commentData._id) {
              return { ...comment, ...commentData };
            }
            return comment;
          }),
        };
      }
      return post;
    });
    postsVar(updatedPosts);
  }
  // At current personal user
  const currentPersonalUser = currentPersonalUserVar();
  if (
    currentPersonalUser?.postsData?.some(
      (post) => post._id === commentData.post
    )
  ) {
    const udpatedCurrentPersonalPostUser = {
      ...currentPersonalUser,
      postsData: currentPersonalUser.postsData.map((post) => {
        if (post._id === commentData.post && post.commentsData) {
          return {
            ...post,
            commentsData: post.commentsData.map((comment) => {
              if (comment._id === commentData._id) {
                return { ...comment, ...commentData };
              }
              return comment;
            }),
          };
        }
        return post;
      }),
    };
    currentPersonalUserVar(udpatedCurrentPersonalPostUser);
  }
};

export const addLikeResponseAtHomePage = (responseData) => {
  // At home page
  const posts = postsVar();

  const specificPost = posts.find((post) => post._id === responseData.post);
  if (!specificPost || !specificPost.commentsData) return;
  const specificComment = specificPost.commentsData.find(
    (commentItem) => commentItem._id === responseData.comment
  );
  if (!specificComment || !specificComment.responsesData) return;
  const specificResponse = specificComment.responsesData.find(
    (response) => response._id === responseData._id
  );
  if (!specificResponse) return;
  const updatedPosts = posts.map((post) => {
    if (post._id === responseData.post && post.commentsData) {
      return {
        ...post,
        commentsData: post.commentsData.map((comment) => {
          if (comment._id === responseData.comment) {
            return {
              ...comment,
              responsesData: comment.responsesData.map((response) => {
                if (response._id === responseData._id) {
                  return { ...response, ...responseData };
                }
                return response;
              }),
            };
          }
          return comment;
        }),
      };
    }
    return post;
  });

  postsVar(updatedPosts);
};

export const addLikeResponseAtCurrentPersonalUserPage = (responseData) => {
  const currentPersonalUser = currentPersonalUserVar();
  if (!currentPersonalUser.postsData) return;
  const specificPost = currentPersonalUser.postsData.find(
    (post) => post._id === responseData.post
  );
  if (!specificPost || !specificPost.commentsData) return;
  const specificComments = specificPost.commentsData.find(
    (commentItem) => commentItem._id === responseData.comment
  );
  if (!specificComments) return;
  const specificResponse = specificComments.responsesData.find(
    (response) => response._id === responseData._id
  );
  if (!specificResponse) return;

  const udpatedCurrentPersonalPostUser = {
    ...currentPersonalUser,
    postsData: currentPersonalUser.postsData.map((post) => {
      if (post._id === responseData.post && post.commentsData) {
        return {
          ...post,
          commentsData: post.commentsData.map((comment) => {
            if (comment._id === responseData.comment && comment.responsesData) {
              return {
                ...comment,
                responsesData: comment.responsesData.map((response) => {
                  if (response._id === responseData._id) {
                    return {
                      ...response,
                      ...responseData,
                    };
                  }
                  return response;
                }),
              };
            }
            return comment;
          }),
        };
      }
      return post;
    }),
  };
  currentPersonalUserVar(udpatedCurrentPersonalPostUser);
};

export const addNewResponseToCommentAtHomePage = (newResponse) => {
  const posts = [...postsVar()];
  const specificPost = posts.find((post) => post._id === newResponse.post);
  if (!specificPost || !specificPost.commentsData) return;
  const specificCommentsData = specificPost.commentsData.find(
    (commentItem) => commentItem._id === newResponse.comment
  );
  if (!specificCommentsData) return;

  const updatedPost = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === newResponse.post) {
      _post.responses = [newResponse._id, ..._post.responses];
      _post.commentsData = _post.commentsData.map((comment) => {
        let _comment = { ...comment };
        if (_comment._id === newResponse.comment) {
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
  postsVar(updatedPost);
};

export const addNewResponseToCommentAtPersonalUser = (newResponse) => {
  const currentPersonalUser = currentPersonalUserVar();
  if (!currentPersonalUser.postsData) return;
  const specificPost = currentPersonalUser.postsData.find(
    (post) => post._id === newResponse.post
  );
  if (!specificPost || !specificPost.commentsData) return;
  const specificCommentsData = specificPost.commentsData.find(
    (commentItem) => commentItem._id === newResponse.comment
  );
  if (!specificCommentsData) return;

  const updatedCurrentPersonalPostUser = {
    ...currentPersonalUser,
    postsData: currentPersonalUser.postsData.map((post) => {
      if (post._id === newResponse.post) {
        let cloned_post = { ...post };
        cloned_post.responses = [newResponse._id, ...cloned_post.responses];
        cloned_post.commentsData = post.commentsData.map((comment) => {
          if (comment._id === newResponse.comment) {
            let cloned_comment = { ...comment };
            cloned_comment.responses = [
              newResponse._id,
              ...cloned_comment.responses,
            ];
            cloned_comment.responsesData = cloned_comment.responsesData
              ? [{ ...newResponse }, ...cloned_comment.responsesData]
              : [{ ...newResponse }];
            return cloned_comment;
          }
          return comment;
        });
        return cloned_post;
      }
      return post;
    }),
  };
  currentPersonalUserVar(updatedCurrentPersonalPostUser);
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

export const removeLikeResponseAtHomePage = (responseData) => {
  const posts = postsVar();
  const specificPost = posts.find((post) => post._id === responseData.post);
  if (!specificPost || !specificPost.commentsData) return;
  const specificComment = specificPost.commentsData.find(
    (comment) => comment._id === responseData.comment
  );

  if (!specificComment || !specificComment.responsesData) return;
  const specificResponse = specificComment.responsesData.find(
    (response) => response._id === responseData._id
  );
  if (!specificResponse) return;

  const updatedPosts = posts.map((post) => {
    if (post._id === responseData.post && post.commentsData) {
      return {
        ...post,
        commentsData: post.commentsData.map((comment) => {
          if (comment._id === responseData.comment) {
            return {
              ...comment,
              responsesData: comment.responsesData.map((response) => {
                if (response._id === responseData._id) {
                  return { ...response, ...responseData };
                }
                return response;
              }),
            };
          }
          return comment;
        }),
      };
    }
    return post;
  });

  postsVar(updatedPosts);
};

export const removeLikeResponseAtCurrentPersonalUser = (responseData) => {
  const currentPersonalUser = currentPersonalUserVar();

  if (!currentPersonalUser.postsData) return;
  const specificPost = currentPersonalUser.postsData.find(
    (post) => post._id === responseData.post
  );
  if (!specificPost || !specificPost.commentsData) return;
  const specificComments = specificPost.commentsData.find(
    (commentItem) => commentItem._id === responseData.comment
  );
  if (!specificComments || !specificComments.responsesData) return;
  const specificResponse = specificComments.responsesData.find(
    (response) => response._id === responseData._id
  );
  if (!specificResponse) return;

  const updatedCurrentPersonalUser = {
    ...currentPersonalUser,
    postsData: currentPersonalUser.postsData.map((post) => {
      if (post._id === responseData.post && post.commentsData) {
        return {
          ...post,
          commentsData: post.commentsData.map((comment) => {
            if (comment._id === responseData.comment && comment.responsesData) {
              return {
                ...comment,
                responsesData: comment.responsesData.map((response) => {
                  if (response._id === responseData._id) {
                    return { ...response, ...responseData };
                  }
                  return response;
                }),
              };
            }
            return comment;
          }),
        };
      }
      return post;
    }),
  };
  currentPersonalUserVar(updatedCurrentPersonalUser);
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

export const updateLikePostSubscription = (likedPost) => {
  // At home page
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
  // At Current Personal user page
  const currentPersonalUser = currentPersonalUserVar();
  if (
    currentPersonalUser?.postsData?.some((post) => post._id === likedPost._id)
  ) {
    const updatedCurerntPostsUser = {
      ...currentPersonalUser,
      postsData: currentPersonalUser.postsData.map((post) => {
        if (post._id === likedPost._id) {
          return { ...post, ...likedPost };
        }
        return post;
      }),
    };
    currentPersonalUserVar(updatedCurerntPostsUser);
  }
};

export const updatePost = (editedPost) => {
  //At home page
  const posts = postsVar();
  if (posts.some((post) => post._id === editedPost._id)) {
    const updatedPost = posts.map((post) => {
      if (post._id === editedPost._id) {
        return { ...post, ...editedPost };
      }
      return post;
    });
    return postsVar(updatedPost);
  }
  // At current personal user
  const currentPersonalUser = currentPersonalUserVar();
  if (
    currentPersonalUser?.postsData?.some((post) => post._id === editedPost._id)
  ) {
    const updatedPosts = {
      ...currentPersonalUser,
      postsData: currentPersonalUser.postsData.map((post) => {
        if (post._id === editedPost._id) {
          return { ...post, ...editedPost };
        }
        return post;
      }),
    };
    currentPersonalUserVar(updatedPosts);
  }
};

export const removeLikePost = (removedLikePost) => {
  const posts = [...postsVar()];
  if (posts.some((post) => post._id === removedLikePost._id)) {
    const updatedPosts = posts.map((post) => {
      if (post._id === removedLikePost._id) {
        return {
          ...post,
          ...removedLikePost,
        };
      }
      return post;
    });
    postsVar(updatedPosts);
  }
  const currentPersonalUser = currentPersonalUserVar();
  if (
    currentPersonalUser?.postsData?.some(
      (post) => post._id === removedLikePost._id
    )
  ) {
    const updatedCurrentPersonalUser = {
      ...currentPersonalUser,
      postsData: currentPersonalUser.postsData.map((post) => {
        if (post._id === removedLikePost._id) {
          return {
            ...post,
            ...removedLikePost,
          };
        }
        return post;
      }),
    };
    currentPersonalUserVar(updatedCurrentPersonalUser);
  }
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

export const addFetchedCommentsToPost = (postId, comments) => {
  // At home page
  const posts = postsVar();
  if (posts.some((post) => post._id === postId)) {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          commentsData: post.commentsData
            ? [...post.commentsData, ...comments]
            : [...comments],
        };
      }
      return post;
    });
    postsVar(updatedPosts);
  }
  let currentUser = currentPersonalUserVar();
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
    currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};

export const addResponsesToComment = (postId, commentId, responses) => {
  //At home pag
  const posts = postsVar();
  const updatedPosts = posts.map((post) => {
    if (post._id === postId && post.commentsData) {
      let cloned_post = { ...post };
      cloned_post.commentsData = cloned_post.commentsData.map((comment) => {
        if (comment._id === commentId) {
          let cloned_comment = { ...comment };
          cloned_comment.responsesData = cloned_comment.responsesData
            ? [...cloned_comment.responsesData, ...responses]
            : [...responses];
        }
        return comment;
      });
      return cloned_post;
    }
    return post;
  });
  postsVar([...updatedPosts]);

  // At current personal user
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser?.postsData?.some((post) => post._id === postId)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      if (
        post._id === postId &&
        post?.commentsData.some((comment) => comment._id === commentId)
      ) {
        const updatedComments = post.commentsData.map((comment) => {
          if (comment._id === commentId) {
            let cloned_comment = { ...comment };
            cloned_comment.responsesData = cloned_comment.responsesData
              ? [...cloned_comment.responsesData, ...responses]
              : [...responses];
            return cloned_comment;
          }
          return comment;
        });
        return { ...post, commentsData: updatedComments };
      }
      return { ...post };
    });
    currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};

//#endregion
