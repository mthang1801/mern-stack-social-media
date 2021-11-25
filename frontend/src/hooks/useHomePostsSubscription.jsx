import { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { FETCH_POSTS } from '../apollo/post/post.queries';
import {
  CREATE_COMMENT_SUBSCIPTION,
  CREATE_RESPONSE_SUBSCRIPTION,
  EDIT_POST_SUBSCRIPTION,
} from '../apollo/post/post.types';
import { userVar } from '../apollo/cache';
import {
  addCommentToPost,
  addNewResponseToComment,
  updatePost,
} from '../apollo/post/post.caches';
const useHomePostsSubscription = () => {
  const { subscribeToMore: subscribePosts } = useQuery(FETCH_POSTS, {
    fetchPolicy: 'cache-and-network',
    skip: true,
  });
  const user = useReactiveVar(userVar);

  useEffect(() => {
    let unsubscribeCreateComment,
      unsubscribeCreateResponse,
      unsubscribeUpdatePost;
    if (user && subscribePosts) {
      unsubscribeCreateComment = subscribePosts({
        document: CREATE_COMMENT_SUBSCIPTION,
        updateQuery: (_, { subscriptionData }) => {
          console.log(subscriptionData);
          if (subscriptionData) {
            const { createCommentSubscription: comment } =
              subscriptionData.data;

            if (comment.author._id !== user._id) {
              addCommentToPost(comment.post, comment);
            }
          }
        },
      });
      unsubscribeCreateResponse = subscribePosts({
        document: CREATE_RESPONSE_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          console.log(subscriptionData);
          if (subscriptionData) {
            const { createResponseSubscription: response } =
              subscriptionData.data;
            if (response.author._id !== user._id) {
              addNewResponseToComment(
                response.post,
                response.comment,
                response
              );
            }
          }
        },
      });
      unsubscribeUpdatePost = subscribePosts({
        document: EDIT_POST_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          console.log(subscriptionData);
          if (subscriptionData) {
            const { editPostSubscription } = subscriptionData.data;
            updatePost(editPostSubscription);
          }
        },
      });
    }
    return () => {
      if (unsubscribeCreateComment) {
        unsubscribeCreateComment();
      }
      if (unsubscribeCreateResponse) {
        unsubscribeCreateResponse();
      }
      if (unsubscribeUpdatePost) {
        unsubscribeUpdatePost();
      }
    };
  }, [user, subscribePosts]);
};

export default useHomePostsSubscription;
