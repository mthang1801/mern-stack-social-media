import { useEffect } from 'react';
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client';
import { FETCH_POSTS } from '../apollo/post/post.queries';
import {
  CREATE_COMMENT_SUBSCIPTION,
  LIKE_COMMENT_SUBSCRIPTION,
  CREATE_RESPONSE_SUBSCRIPTION,
  LIKE_RESPONSE_SUBSCRIPTION,
  EDIT_POST_SUBSCRIPTION,
  LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
  REMOVE_LIKE_COMMENT_SUBSCRIPTION,
} from '../apollo/post/post.types';
import { userVar } from '../apollo/cache';
import {
  addCommentToPost,
  addNewResponseToCommentAtPersonalUser,
  updatePost,
  updateLikePostSubscription,
  removeLikePost,
  addLikeResponseAtCurrentPersonalUserPage,
  removeLikeResponseAtCurrentPersonalUser,
  addLikeComment,
  removeLikeComment,
} from '../apollo/post/post.caches';

const useCurrentPersonalSubscription = () => {
  const { subscribeToMore: subscribePosts } = useQuery(FETCH_POSTS, {
    skip: true,
    fetchPolicy: 'network-only',
  });
  const user = useReactiveVar(userVar);
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
        addCommentToPost(createCommentSubscription);
      }
    },
  });
  useSubscription(LIKE_COMMENT_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data?.likeCommentSubscription) {
        const { likeCommentSubscription } = subscriptionData.data;
        addLikeComment(likeCommentSubscription);
      }
    },
  });
  useSubscription(REMOVE_LIKE_COMMENT_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data?.removeLikeCommentSubscription) {
        const { removeLikeCommentSubscription } = subscriptionData.data;
        removeLikeComment(removeLikeCommentSubscription);
      }
    },
  });
  useSubscription(CREATE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data?.createResponseSubscription) {
        const { createResponseSubscription } = subscriptionData.data;
        addNewResponseToCommentAtPersonalUser(createResponseSubscription);
      }
    },
  });
  useSubscription(LIKE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data.likeResponseSubscription) {
        const { likeResponseSubscription } = subscriptionData.data;
        addLikeResponseAtCurrentPersonalUserPage(likeResponseSubscription);
      }
    },
  });
  useSubscription(REMOVE_LIKE_RESPONSE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data.removeLikeResponseSubscription) {
        const { removeLikeResponseSubscription } = subscriptionData.data;
        removeLikeResponseAtCurrentPersonalUser(removeLikeResponseSubscription);
      }
    },
  });

  useSubscription(EDIT_POST_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
      if (subscriptionData.data?.editPostSubscription) {
        const { editPostSubscription } = subscriptionData.data;
        updatePost(editPostSubscription);
      }
    },
  });
};

export default useCurrentPersonalSubscription;
