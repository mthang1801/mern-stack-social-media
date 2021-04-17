import { userVar, postsVar } from "../cache";

export const addFetchedPostToCache = (fetchedPosts) => {
  const posts = [...postsVar()];
  if (!Array.isArray(fetchedPosts)) {
    return false;
  }
  return postsVar([...posts, ...fetchedPosts]);
};

export const pushNewPostToPostsList = newPost => {
  const posts = [...postsVar()];
  return [{...newPost}, , ...posts];
}

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
  const findResponsesByResponseId = findCommentsDataByCommentId.responsesData.find(
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

export const addNewResponseToComment = (
  postId,
  commentId,
  newResponse
) => {
  const posts = [...postsVar()];
  const specificPost = posts.find(post => post._id === postId)
  if(!specificPost || !specificPost.commentsData) return ; 
  const specificCommentsData = specificPost.commentsData.find(commentItem => commentItem._id === commentId);
  if(!specificCommentsData) return; 
  
  const updatedPost = posts.map(post => {
    let _post  = {...post};
    if(_post._id === postId){
      _post.responses = [newResponse._id , ..._post.responses];
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment};
        if(_comment._id === commentId){
          _comment.responses = [newResponse._id, ..._comment.responses];
          _comment.responsesData = _comment.responsesData ? [{...newResponse}, ..._comment.responsesData] : [{...newResponse}]  ;
        }
        return {..._comment}; 
      })
    }
    return {..._post};
  })
  return postsVar(updatedPost);
};

export const addResponsesToComment = (
  postId,
  commentId,
  responses
) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map((post) => {
    let _post = { ...post };
    if (_post._id === postId && _post.commentsData) {      
      _post.commentsData =  _post.commentsData.map((comment) => {              
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
  const updatedPosts = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId){
      _post.comments = _post.comments.filter(_id => _id !== commentId);
      let commentToRemove = _post.commentsData.find(comment => comment._id === commentId);    
      _post.commentsData = _post.commentsData.filter(comment => comment._id !== commentId);
      _post.responses = _post.responses.filter(responseId => !commentToRemove.responses.includes(responseId))
    }
    return {..._post};
  })
  return postsVar(updatedPosts);
  
};

export const removeLikeComment = (postId, commentId, userId) => {
  const posts = [...postsVar()];
  const updatedPost = posts.map(post => {
    let _post = {...post}; 
    if(_post._id === postId &&  _post.commentsData){
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment} ; 
        if(_comment._id === commentId){
          _comment.likes  = _comment.likes.filter(_id=> _id !== userId )
        }
        return {..._comment}; 
      })
    }
    return {..._post}; 
  })
  return postsVar(updatedPost);
}

export const removeLikeResponse = (postId, commentId, responseId, userId) => {
  const posts = [...postsVar()];
  
  const findPostByPostId = posts.find(post => post._id === postId); 
  if(!findPostByPostId || findPostByPostId && !findPostByPostId.commentsData) return; 
  const findCommentsDataByCommentId = findPostByPostId.commentsData.find(comment => comment._id === commentId);
  if(!findCommentsDataByCommentId || findCommentsDataByCommentId && !findCommentsDataByCommentId.responsesData) return ; 
  const findResponsesByResponseId = findCommentsDataByCommentId.responsesData.find(response => response._id === responseId);
  if(!findResponsesByResponseId) return ; 

const updatedPost = posts.map(post => {
    let _post = {...post};
    if(_post._id === postId ){      
      _post.commentsData = _post.commentsData.map(comment => {
        let _comment = {...comment};
        if(_comment._id === commentId){         
          _comment.responsesData = _comment.responsesData.map(response => {
            let _response = {...response};            
            if(_response._id === responseId){              
              _response.likes = _response.likes.filter(_id => _id !== userId);
            }
            return {..._response};
          })
        }
        return {..._comment};
      })
    }
    return {..._post};
  })

  return postsVar(updatedPost);
}

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

export const updateCommentLikes = comment => {
  const posts = [...postsVar()];
  const {post : postId} = comment;  
  //find post contain comment
  const post = posts.find(post => post._id === postId);
  //check post has commentsData and comment is currently whether contained in post or not
  if(post.commentsData && post?.commentsData.some(commentData => commentData._id === comment._id )){    
      const updatedPosts = posts.map(postItem => {
        let _post = {...postItem};
        if(_post._id === comment.post){
          _post.commentsData = _post.commentsData.map(commentItem => {
            let _comment = {...commentItem};
            if(_comment._id === comment._id){              
              _comment.likes = [...new Set(comment.likes)];
            }
            return {..._comment};
          })
        }
        return {..._post};
      })
    return postsVar(updatedPosts)
  }
  
}

export const updateLikePost =(postId, userId) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map(post => {
    if(post._id === postId){
      let _post = {...post} ;
      _post.likes = [..._post.likes, userId];
      return {..._post};
    }
    return {...post};
  })
  return postsVar(updatedPosts);
}

export const updatePost = updatedPost => {
  const posts = [...postsVar()];
  if(posts.some(post => post._id === updatedPost._id)){
    const updatedPost = posts.map(post => {
      let _post = {...post};
      if(_post._id === updatedPost._id){
        return {..._post, ...updatedPost};
      }
      return {..._post};
    })
    return postsVar(updatedPost);
  }
}

export const updateRemoveLikePost = (postId, userId) => {
  const posts = [...postsVar()];
  const updatedPosts = posts.map(post => {
    if(post._id === postId){
      let _post = {...post} ;
      _post.likes = _post.likes.filter(_id => _id !== userId);
      return {..._post};
    }
    return {...post};
  })
  return postsVar(updatedPosts);
}