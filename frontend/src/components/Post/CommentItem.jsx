import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./PostEditor/styles/PostEditorBody.styles";
import {
  UserAvatar,
  ResponseInput,
  ResponsesComponent,
  LoadMoreResponse,
  CommentResponse,
} from "./styles/CommentItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { BsArrowReturnRight } from "react-icons/bs";
import { Response } from "./styles/CommentItem.styles";
import ResponseEditor from "./ResponseEditor";
import { useQuery, useMutation } from "@apollo/client";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { GET_DIALOG } from "../../apollo/operations/queries/cache";
import {
  REMOVE_COMMENT,
  LIKE_COMMENT,
  REMOVE_LIKE_COMMENT,
  REMOVE_RESPONSE
} from "../../apollo/operations/mutations/post";

import { FETCH_RESPONSES } from "../../apollo/operations/queries/post/fetchResponses";
import Responses from "./Responses";
import shortid from "shortid";
import CommentCard from "./CommentCard";
const CommentItem = ({ comment, user }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const [showResponse, setShowResponse] = useState(false);
  const [dataResponse, setDataResponse] = useState("");
  const { controls } = i18n.store.data[lang].translation.comment;
  const { dialog: dialogAlert } = i18n.store.data[lang].translation;
  const [focusResponseEditor, setFocusResponseEditor] = useState(false);
  const {
    setDialog,
    removeComment: removeCommentFromPostCache,
    addLikeComment,
    removeLikeComment,
    addResponsesToComment,
    removeResponse : removeResponseInCache
  } = cacheMutations;
  const {
    data: { dialog },
  } = useQuery(GET_DIALOG);
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [RemoveLikeComment] = useMutation(REMOVE_LIKE_COMMENT);
  const [removeResponse] = useMutation(REMOVE_RESPONSE)
  const { refetch: fetchResponses } = useQuery(FETCH_RESPONSES, { skip: true });
  const [response, setResponse] = useState(comment);
  const onClickRemoveComment = () => {
    setDialog({
      agree: false,
      title: dialogAlert.removeComment.title,
      content: dialogAlert.removeComment.content,
      data: { commentId: comment._id, role : "comment" },
    });
  };
  const [removeComment] = useMutation(REMOVE_COMMENT);

  useEffect(() => {
    if (dialog.data?.commentId === comment._id && dialog.agree && dialog.data?.role === "comment") {
      removeComment({ variables: { commentId: comment._id } }).then(
        ({ data }) => {
          removeCommentFromPostCache(comment.post, comment._id);
        }
      );
    }
    else if(dialog.data?.role === "response" && dialog.data?.response && dialog.agree){
      removeResponse({variables : {responseId : dialog.data.response._id}}).then(({data})=> {
        if(data.removeResponse){
          const {post, comment, _id} = dialog.data.response
          removeResponseInCache(post, comment, _id);
        }
      })
    }
  }, [dialog]);
  const onLikeComent = () => {
    likeComment({ variables: { commentId: comment._id } })
      .then(({ data }) => {
        if (data.likeComment) {
          addLikeComment(comment.post, comment._id, user._id);
        }
      })
      .catch((err) => console.log(err));
  };
  const onRemoveLikeComment = () => {
    RemoveLikeComment({ variables: { commentId: comment._id } })
      .then(({ data }) => {
        if (data.removeLikeComment) {
          removeLikeComment(comment.post, comment._id, user._id);
        }
      })
      .catch((err) => console.log(err));
  };
  const onClickResponseComment = useCallback(async (data) => {    
    if(data){
      setDataResponse(
        `{"blocks":[{"key":"${shortid.generate()}","text":"${
          data.author.name
        } ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":${
          data.author.name.length
        },"key":0}],"data":{}}],"entityMap":{"0":{"type":"mention","mutability":"SEGMENTED","data":{"mention":{"__typename":"User","_id":"${
          data.author._id
        }","name":"${data.author.name}","avatar":"${
          data.author.avatar
        }","slug":"${data.author.slug}"}}}}}`
      );
      setResponse(data);
    }
    
    if (comment.responses.length && !comment.responsesData?.length) {
      await onLoadResponses();
    } else {
      setShowResponse(true);
      setFocusResponseEditor(true);
    }
  }, [comment.responsesData]);

  const onLoadResponses = () => {
    fetchResponses({ commentId: comment._id, skip: 0, limit: 3 }).then(
      ({ data }) => {
        if (data.fetchResponses) {          
          addResponsesToComment(comment.post, comment._id, data.fetchResponses);
          if (!showResponse) {            
            setShowResponse(true);
            setFocusResponseEditor(true);
          }
        }
      }
    );
  };  

  const onLoadMoreResponses = () => {
    const skip = comment.responsesData?.length || 0;
    fetchResponses({ commentId: comment._id, skip }).then(({ data }) => {
      if (data.fetchResponses) {
        addResponsesToComment(comment.post, comment._id, data.fetchResponses);
        if (!showResponse) {          
          setShowResponse(true);
          setFocusResponseEditor(true);
        }
      }
    });
  };
  return (
    <Wrapper>
      <CommentCard
        comment={comment}
        user={user}
        onLike={onLikeComent}
        onRemoveLike={onRemoveLikeComment}
        onClickRemoveComment={onClickRemoveComment}
        onClickResponse={onClickResponseComment}
      />
      <CommentResponse>
        {comment.responsesData && (
          <ResponsesComponent>
            <Responses
              responses={comment.responsesData}              
              user={user}
              onClickResponse={onClickResponseComment}
            />
          </ResponsesComponent>
        )}

        {showResponse && (
          <ResponseInput>
            <UserAvatar>
              <LazyLoadImage
                effect="blur"
                src={comment.author.avatar}
                alt={comment.author.avatar}
              />
            </UserAvatar>
            <Response>
              <ResponseEditor
                comment={comment}
                response={response}
                user={user}
                dataResponse={dataResponse}
                focus={focusResponseEditor}
                removeFocus={() => setFocusResponseEditor(false)}
              />
            </Response>
          </ResponseInput>
        )}
        {comment.responsesData &&
        comment.responsesData.length < comment.responses.length ? (
          <LoadMoreResponse onClick={onLoadMoreResponses}>
            {" "}
            <BsArrowReturnRight /> <span>{controls.loadMoreResponses}</span>
          </LoadMoreResponse>
        ) : !comment.responsesData && comment.responses.length ? (
          <LoadMoreResponse onClick={onLoadResponses}>
            {" "}
            <BsArrowReturnRight /> <span>{controls.loadMoreResponses}</span>
          </LoadMoreResponse>
        ) : null}
      </CommentResponse>
    </Wrapper>
  );
};

export default CommentItem;
