import { useEffect } from 'react';
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client';
import { FETCH_POSTS } from '../apollo/post/post.queries';
import {
  CREATE_COMMENT_SUBSCIPTION,
  CREATE_RESPONSE_SUBSCRIPTION,
  LIKE_RESPONSE_SUBSCRIPTION,
  EDIT_POST_SUBSCRIPTION,
  LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
} from '../apollo/post/post.types';
import { userVar } from '../apollo/cache';
import {
  addCommentToPost,
  addNewResponseToComment,
  updatePost,
  updateLikePostSubscription,
  removeLikePost,
  addLikeResponse,
  removeLikeResponse,
} from '../apollo/post/post.caches';

const useHomePostsSubscription = () => {
  const { subscribeToMore: subscribePosts } = useQuery(FETCH_POSTS, {
    skip: true,
    fetchPolicy: 'network-only',
  });
  useSubscription(LIKE_POST_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data) {
        const { likePostSubscription } = subscriptionData.data;
        updateLikePostSubscription(likePostSubscription);
      }
    },
  });
  useSubscription(REMOVE_LIKE_POST_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data) {
        const { removeLikePostSubscription } = subscriptionData.data;
        removeLikePost(removeLikePostSubscription);
      }
    },
  });
  useSubscription(CREATE_COMMENT_SUBSCIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data?.createCommentSubscription) {
        const { createCommentSubscription } = subscriptionData.data;
        addCommentToPost(
          createCommentSubscription.post,
          createCommentSubscription
        );
      }
    },
  });
  useSubscription(CREATE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data?.createResponseSubscription) {
        const { createResponseSubscription } = subscriptionData.data;
        addNewResponseToComment(createResponseSubscription);
      }
    },
  });
  useSubscription(LIKE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data.likeResponseSubscription) {
        const { likeResponseSubscription } = subscriptionData.data;
        console.log(likeResponseSubscription);
        addLikeResponse(likeResponseSubscription);
      }
    },
  });
  useSubscription(REMOVE_LIKE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data.removeLikeResponseSubscription) {
        const { removeLikeResponseSubscription } = subscriptionData.data;
        removeLikeResponse(removeLikeResponseSubscription);
      }
    },
  });

  const user = useReactiveVar(userVar);

  useEffect(() => {
    let unsubscribeLikePost,
      unsubscribeCreateComment,
      unsubscribeCreateResponse,
      unsubscribeUpdatePost;

    if (user && subscribePosts) {
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
      if (unsubscribeLikePost) {
        unsubscribeLikePost();
      }
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
