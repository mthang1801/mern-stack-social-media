import React, { useCallback, useEffect } from 'react';
import CommentCard from './CommentCard';
import { useMutation, useQuery } from '@apollo/client';
import {
  LIKE_RESPONSE,
  REMOVE_LIKE_RESPONSE,
} from '../../apollo/post/post.types';
import { setAlertDialog } from '../../apollo/controls/controls.caches';
import useLocale from '../../locales';
const Responses = ({ responses, user, onClickResponse }) => {
  const [likeResponse] = useMutation(LIKE_RESPONSE);
  const [removeLikeResponse] = useMutation(REMOVE_LIKE_RESPONSE);
  const { translation } = useLocale();
  const { dialog: dialogAlert } = translation;

  const onLikeResponse = useCallback((response) => {
    likeResponse({ variables: { responseId: response._id } });
  }, []);
  const onRemoveLikeResponse = useCallback((response) => {
    removeLikeResponse({ variables: { responseId: response._id } });
  }, []);

  const onClickRemoveResponse = useCallback((response) => {
    setAlertDialog({
      agree: false,
      title: dialogAlert.removeComment.title,
      content: dialogAlert.removeComment.content,
      data: { response, role: 'response' },
    });
  });
  return responses.map((response) => (
    <CommentCard
      key={`response-${response._id}`}
      comment={response}
      user={user}
      onLike={onLikeResponse}
      onRemoveLike={onRemoveLikeResponse}
      onClickResponse={onClickResponse}
      onClickRemoveComment={onClickRemoveResponse}
    />
  ));
};

export default Responses;
