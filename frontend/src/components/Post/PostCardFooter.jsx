import React, { useState } from 'react';
import {
  Wrapper,
  Controls,
  Button,
  CounterLike,
  LikeButton,
  Comments,
  UserComment,
  AvatarContainer,
  FormComment,
  PostInfo,
  CommentCounter,
} from './styles/PostCardFooter.styles';
import useLanguage from '../Global/useLanguage';
import { BiLike } from 'react-icons/bi';
import { useTheme } from '../../theme';
import { useMutation, useReactiveVar } from '@apollo/client';
import { LIKE_POST, REMOVE_LIKE_POST } from '../../apollo/post/post.types';

import LazyLoad from 'react-lazyload';
import CommentEditor from './CommentEditor';
const PostCardFooter = ({ post, fetchComments, user }) => {
  const { i18n, lang } = useLanguage();
  const { controls } = i18n.store.data[lang].translation.post;
  const { theme } = useTheme();
  const [likePost] = useMutation(LIKE_POST);
  const [removeLikePost] = useMutation(REMOVE_LIKE_POST);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const onLikePost = () => {
    likePost({ variables: { postId: post._id } })
      .then(({ data }) => {
        if (data.likePost) {
          // updateLikePost(post._id, user._id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUnlikePost = () => {
    removeLikePost({ variables: { postId: post._id } });
  };

  const onClickComment = () => {
    if (!showCommentEditor) {
      fetchComments();
      setShowCommentEditor(true);
    }
  };
  const onClickLikePost = () => {
    if (user) {
      return post.likes.includes(user._id) ? onUnlikePost() : onLikePost();
    }
    alert('Please login before comment');
  };

  return (
    <Wrapper>
      <Controls theme={theme}>
        {/* Like */}
        <Button
          theme={theme}
          liked={post.likes.includes(user?._id)}
          onClick={onClickLikePost}
        >
          <span>{controls.like.icon()}</span>
          <span>
            {post.likes.includes(user?._id)
              ? controls.liked.name
              : controls.like.name}
          </span>
        </Button>
        {/* Comment */}
        <Button theme={theme} onClick={onClickComment}>
          <span>{controls.comment.icon()}</span>
          <span>{controls.comment.name}</span>
        </Button>
        {/* Share */}
        <Button theme={theme}>
          <span>{controls.share.icon()}</span>
          <span>{controls.share.name}</span>
        </Button>
      </Controls>
      <PostInfo>
        {post.likes.length ? (
          <CounterLike>
            <LikeButton>
              <BiLike />
            </LikeButton>
            <span>{post.likes.length}</span>
          </CounterLike>
        ) : null}
        {post.comments.length + post.responses.length > 0 ? (
          <CommentCounter onClick={onClickComment}>
            {controls.countComments(
              post.comments.length + post.responses.length
            )}
          </CommentCounter>
        ) : null}
      </PostInfo>

      {showCommentEditor && user && (
        <>
          <Comments>
            <UserComment>
              <AvatarContainer>
                <LazyLoad>
                  <img src={user.avatar} alt={user.avatar} />
                </LazyLoad>
              </AvatarContainer>
              <FormComment theme={theme}>
                <CommentEditor post={post} />
              </FormComment>
            </UserComment>
          </Comments>
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(PostCardFooter);
