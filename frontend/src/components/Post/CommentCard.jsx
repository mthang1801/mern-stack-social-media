import React from "react";
import {CommentContainer, UserAvatar, CommentContent,UserName, CommentText, CommentControls,ControlItem } from "./styles/CommentCard.styles"
import {LazyLoadImage} from "react-lazy-load-image-component"
import Moment from "react-moment";
import {useThemeUI} from "theme-ui";
import useLanguage from "../Global/useLanguage"

const CommentCard = ({comment, user, onRemoveLike, onLike, onClickResponse, onClickRemoveComment}) => {
  const {colorMode} = useThemeUI()
  const { i18n, lang } = useLanguage();
  const { controls } = i18n.store.data[lang].translation.comment;
  return (
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
            <ControlItem active onClick={onRemoveLike}>
              {controls.liked}
            </ControlItem>
          ) : (
            <ControlItem onClick={onLike}>{controls.like}</ControlItem>
          )}
          <ControlItem onClick={onClickResponse}>
            {controls.response}
          </ControlItem>
          {user._id === comment.author._id}
          {
            <ControlItem onClick={onClickRemoveComment}>
              {controls.remove}
            </ControlItem>
          }
          <ControlItem>
            <Moment fromNow>{+comment.createdAt}</Moment>
          </ControlItem>
        </CommentControls>
      </CommentContent>
    </CommentContainer>
  );
};

export default CommentCard;
