import React from 'react';
import {
  CommentContainer,
  UserAvatar,
  CommentContent,
  UserName,
  CommentText,
  CommentControls,
  ControlItem,
  LikeButton,
  LikeCounters,
} from './styles/CommentCard.styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Moment from 'react-moment';
import { useTheme } from '../../theme';
import useLocale from '../../locales';
import { BiLike } from 'react-icons/bi';
const CommentCard = ({
  comment,
  user,
  onRemoveLike,
  onLike,
  onClickResponse,
  onClickRemoveComment,
}) => {
  const { theme } = useTheme();
  const { translation } = useLocale();
  const { controls } = translation.comment;
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
        <CommentText theme={theme}>
          <UserName to={`/${comment.author.slug}`}>
            {comment.author.name}
          </UserName>
          <div
            data-target={`comment-item-${comment._id}`}
            dangerouslySetInnerHTML={{ __html: comment.text }}
          ></div>
          {comment.likes.length ? (
            <LikeCounters theme={theme}>
              <LikeButton>
                <BiLike />
              </LikeButton>
              <span>{comment.likes.length}</span>
            </LikeCounters>
          ) : null}
        </CommentText>
        <CommentControls>
          {comment.likes.includes(user._id) ? (
            <ControlItem active onClick={() => onRemoveLike(comment)}>
              {controls.liked}
            </ControlItem>
          ) : (
            <ControlItem onClick={() => onLike(comment)}>
              {controls.like}
            </ControlItem>
          )}
          <ControlItem onClick={() => onClickResponse(comment)}>
            {controls.response}
          </ControlItem>
          {user._id === comment.author._id && (
            <ControlItem onClick={() => onClickRemoveComment(comment)}>
              {controls.remove}
            </ControlItem>
          )}
          <ControlItem>
            <Moment fromNow>{+comment.createdAt}</Moment>
          </ControlItem>
        </CommentControls>
      </CommentContent>
    </CommentContainer>
  );
};

export default React.memo(CommentCard);
