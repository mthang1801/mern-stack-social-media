import React, { useCallback, useEffect } from "react";
import CommentCard from "./CommentCard";
import { useMutation, useQuery } from "@apollo/client";
import {
  LIKE_RESPONSE,
  REMOVE_LIKE_RESPONSE,
} from "../../apollo/post/post.types";
import {
  addLikeResponse,
  removeLikeResponse as removeLikeResponseInCache,
} from "../../apollo/post/post.caches";
import {setAlertDialog} from "../../apollo/controls/controls.caches"
import useLanguage from "../Global/useLanguage";
const Responses = ({ responses, user, onClickResponse }) => {
  const [likeResponse] = useMutation(LIKE_RESPONSE);
  const [removeLikeResponse] = useMutation(REMOVE_LIKE_RESPONSE);
  const { i18n, lang } = useLanguage();
  const { dialog: dialogAlert } = i18n.store.data[lang].translation;  

  const onLikeResponse = useCallback((response) => {
    likeResponse({ variables: { responseId: response._id } }).then(
      ({ data }) => {
        if (data.likeResponse) {
          addLikeResponse(
            response.post,
            response.comment,
            response._id,
            user._id
          );
        }
      }
    );
  }, []);
  const onRemoveLikeResponse = useCallback((response) => {
    removeLikeResponse({ variables: { responseId: response._id } }).then(
      ({ data }) => {
        console.log(data);
        if (data.removeLikeResponse) {
          removeLikeResponseInCache(
            response.post,
            response.comment,
            response._id,
            user._id
          );
        }
      }
    );
  }, []);

  const onClickRemoveResponse = useCallback((response) => {
    setAlertDialog({
      agree: false,
      title: dialogAlert.removeComment.title,
      content: dialogAlert.removeComment.content,
      data: { response, role: "response" },
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
