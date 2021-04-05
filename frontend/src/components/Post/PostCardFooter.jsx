import React, { useState } from "react";
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
  CommentCounter
} from "./styles/PostCardFooter.styles";
import useLanguage from "../Global/useLanguage";
import { BiLike } from "react-icons/bi";
import { useThemeUI } from "theme-ui";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/operations/queries/cache";
import { LIKE_POST, REMOVE_LIKE_POST } from "../../apollo/operations/mutations/post";
import { cacheMutations } from "../../apollo/operations/mutations";
import LazyLoad from "react-lazyload";
import CommentEditor from "./CommentEditor";
const PostCardFooter = ({ post, fetchComments }) => {
  const { i18n, lang } = useLanguage();
  const { controls } = i18n.store.data[lang].translation.post;
  const { colorMode } = useThemeUI();
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [likePost] = useMutation(LIKE_POST);
  const [removeLikePost] = useMutation(REMOVE_LIKE_POST);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const { updateLikePost, updateUnlikePost } = cacheMutations;
  const onLikePost = () => {
    likePost({ variables: { postId: post._id } })
      .then(({ data }) => {
        if (data.likePost) {
          updateLikePost(post._id, user._id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUnlikePost = () => {
    removeLikePost({ variables: { postId: post._id } }).then(({ data }) => {
      if (data.removeLikePost) {
        updateUnlikePost(post._id, user._id);
      }
    });
  };

  const onClickComment = () => {
    if(!showCommentEditor){
      fetchComments();
    setShowCommentEditor(true);
    }
    
};
  return (
    <Wrapper>
      <Controls theme={colorMode}>
        {/* Like */}

        <Button
          theme={colorMode}
          liked={post.likes.includes(user._id)}
          onClick={post.likes.includes(user._id) ? onUnlikePost : onLikePost}
        >
          <span>{controls.like.icon()}</span>
          <span>
            {post.likes.includes(user._id)
              ? controls.liked.name
              : controls.like.name}
          </span>
        </Button>
        {/* Comment */}
        <Button theme={colorMode} onClick={onClickComment}>
          <span>{controls.comment.icon()}</span>
          <span>{controls.comment.name}</span>
        </Button>
        {/* Share */}
        <Button theme={colorMode}>
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
        {post.comments.length + post.responses.length > 0 ? <CommentCounter onClick={onClickComment}>{controls.countComments(post.comments.length + post.responses.length)}</CommentCounter> : null}
      </PostInfo>
      
      {showCommentEditor && (
        <>
        <Comments>
          <UserComment>
            <AvatarContainer>
              <LazyLoad>
                <img src={user.avatar} alt={user.avatar} />
              </LazyLoad>
            </AvatarContainer>
            <FormComment theme={colorMode}>
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
