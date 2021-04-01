import React, { useState, useEffect } from "react";
import { Wrapper } from "./PostEditor/styles/PostEditorBody.styles";
import {
  CommentContainer,
  UserAvatar,
  CommentContent,
  CommentText,
  UserName,
  CommentControls,
  ResponseComponent,
  ControlItem,
} from "./styles/CommentItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import Moment from "react-moment";
import { Response } from "./styles/CommentItem.styles";
import ResponseEditor from "./ResponseEditor";
import {useQuery, useMutation} from "@apollo/client";
import {cacheMutations} from "../../apollo/operations/mutations/cache";
import {GET_DIALOG} from "../../apollo/operations/queries/cache";
import {REMOVE_COMMENT} from "../../apollo/operations/mutations/post/removeComment";

const CommentItem = ({ comment, user }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const [showResponse, setShowResponse] = useState(false);
  const { controls } = i18n.store.data[lang].translation.comment;  
  const {dialog : dialogAlert} = i18n.store.data[lang].translation;
  const {setDialog, removeComment : removeCommentFromPostCache} = cacheMutations;
  const {data : {dialog}} = useQuery(GET_DIALOG)
  const onClickRemoveComment = () => {    
    setDialog({agree : false , title : dialogAlert.removeComment.title, content : dialogAlert.removeComment.content, data : {commentId : comment._id}})
  }
  const [removeComment] = useMutation(REMOVE_COMMENT);

  useEffect(() => {
    if(dialog.data?.commentId === comment._id && dialog.agree ){
      removeComment({variables : {commentId: comment._id}}).then(({data}) => {
        removeCommentFromPostCache(comment.post, comment._id);
      })
    }
  },[dialog])
 
  return (
    <Wrapper>
      <CommentContainer>
        <UserAvatar>
          <LazyLoadImage
            effect="blur"
            src={comment.author.avatar}
            alt={comment.author.avatar}
          />
        </UserAvatar>
        <CommentContent>
          <CommentText theme={colorMode}>
            <UserName to={`/${comment.author.slug}`}>
              {comment.author.name}
            </UserName>
            <div
              data-target={`comment-item-${comment._id}`}
              dangerouslySetInnerHTML={{ __html: comment.text }}
            ></div>
          </CommentText>
          <CommentControls>
            {comment.likes.includes(user._id) ? (
              <ControlItem active>{controls.liked}</ControlItem>
            ) : (
              <ControlItem>{controls.like}</ControlItem>
            )}
            <ControlItem
              onClick={() => setShowResponse((prevState) => !prevState)}
            >
              {controls.response}
            </ControlItem>
            {user._id === comment.author._id}{
              <ControlItem
                onClick={onClickRemoveComment}
              >
                {controls.remove}
              </ControlItem>
            }
            <ControlItem
              onClick={() => setShowResponse((prevState) => !prevState)}
            >
              {controls.response}
            </ControlItem>
            <ControlItem>
              <Moment fromNow>{+comment.createdAt}</Moment>
            </ControlItem>
          </CommentControls>
          {showResponse && (
            <ResponseComponent>
              <UserAvatar>
                <LazyLoadImage
                  effect="blur"
                  src={comment.author.avatar}
                  alt={comment.author.avatar}
                />
              </UserAvatar>
              <Response>
                <ResponseEditor comment={comment} user={user} />
              </Response>
            </ResponseComponent>
          )}
        </CommentContent>
      </CommentContainer>
    </Wrapper>
  );
};

export default CommentItem;
