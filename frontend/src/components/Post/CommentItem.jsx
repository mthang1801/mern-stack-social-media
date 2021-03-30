import React, { useState, useEffect, useMemo } from "react";
import {  
  Wrapper,
} from "./PostEditor/styles/PostEditorBody.styles";
import {
  CommentContainer,
  UserAvatar,
  CommentText,
  UserName,
} from "./styles/CommentItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {useThemeUI} from "theme-ui"
const CommentItem = ({ comment }) => {
  const {colorMode} = useThemeUI()
  
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
        <CommentText theme={colorMode}>
          <UserName to={`/${comment.author.slug}`}>
            {comment.author.name.toLowerCase()}
          </UserName>
          <div
            data-target={`comment-item-${comment._id}`}
            dangerouslySetInnerHTML={{ __html: comment.text }}
          ></div>
        </CommentText>
      </CommentContainer>
    </Wrapper>
  );
};

export default CommentItem;
