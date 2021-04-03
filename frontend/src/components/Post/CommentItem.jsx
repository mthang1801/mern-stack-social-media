import React, { useState, useEffect } from "react";
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
import Moment from "react-moment";
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
  const [focusResponseEditor, setFocusResponseEditor] = useState(false)
  const {
    setDialog,
    removeComment: removeCommentFromPostCache,
    addLikeComment,
    removeLikeComment,
    addResponsesToComment,
  } = cacheMutations;
  const {
    data: { dialog },
  } = useQuery(GET_DIALOG);
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [RemoveLikeComment] = useMutation(REMOVE_LIKE_COMMENT);
  const { refetch: fetchResponses } = useQuery(FETCH_RESPONSES, { skip: true });

  const onClickRemoveComment = () => {
    setDialog({
      agree: false,
      title: dialogAlert.removeComment.title,
      content: dialogAlert.removeComment.content,
      data: { commentId: comment._id },
    });
  };
  const [removeComment] = useMutation(REMOVE_COMMENT);

  useEffect(() => {
    if (dialog.data?.commentId === comment._id && dialog.agree) {
      removeComment({ variables: { commentId: comment._id } }).then(
        ({ data }) => {
          removeCommentFromPostCache(comment.post, comment._id);
        }
      );
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
  const onClickResponseComment = async () => {
    setDataResponse(
      `{"blocks":[{"key":"${shortid.generate()}","text":"${
        comment.author.name
      } ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":${
        comment.author.name.length
      },"key":0}],"data":{}},{"key":"2haps","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"mention","mutability":"SEGMENTED","data":{"mention":{"__typename":"User","_id":"${
        comment._id
      }","name":"${comment.author.name}","avatar":"${
        comment.author.avatar
      }","slug":"${comment.author.slug}"}}}}}`
    );    
    if(!showResponse){
     await onLoadResponses();
    }else{
      setShowResponse(true);
      setFocusResponseEditor(true);
    }
    
    
  };

  const onLoadResponses = () => {
    fetchResponses({ commentId: comment._id, skip: 0, limit: 3 }).then(
      ({ data }) => {
        if (data.fetchResponses) {
          addResponsesToComment(comment.post, comment._id, data.fetchResponses);
          if (!showResponse) {
            setDataResponse("");
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
          setDataResponse("");
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
            <Responses responses={comment.responsesData} user={user} />
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
