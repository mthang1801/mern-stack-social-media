import React, { useState, lazy } from "react";
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

const CommentItem = ({ comment, user }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const [showResponse, setShowResponse] = useState(false);
  const { controls } = i18n.store.data[lang].translation.comment;  
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
