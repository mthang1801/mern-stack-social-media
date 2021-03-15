import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Wrapper,
  Avatar,
  BubbleContainer,
  Message,
  MentionWrapper,
  MentionInfo,
  MentionLinkInfo,
  MentionAvatar,
  BubbleTimeline,
  ImageContainer,
  AttachmentContainer,
} from "./styles/Bubble.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { convertFromRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createMentionPlugin from "@draft-js-plugins/mention";
import Moment from "react-moment";
import { GET_CURRENT_USER } from "../../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const linkifyPlugin = createLinkifyPlugin({
  target: "_blank",
  rel: "noopener noreferrer",
});
const mentionPlugin = createMentionPlugin({
  mentionComponent({ mention }) {
    return (
      <MentionWrapper to={`/${mention.slug}`}>
        <MentionLinkInfo to={`/${mention.slug}`}>
          <MentionAvatar src={mention.avatar} />
          <MentionInfo>
            <span>{mention.name}</span>
            <span>@{mention.slug}</span>
          </MentionInfo>
        </MentionLinkInfo>
        <span>@{mention.name}</span>
      </MentionWrapper>
    );
  },
});
const Bubble = ({ message, me,user, senderAvatar, index }) => {  
  const [editorState, setEditorState] = useState(() =>
    message.messageType === "TEXT"
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(message.text)))
      : null
  );
  const [isOpen, setIsOpen] = useState(false);

  const [bubbleDimensions, setBubbleDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const bubbleRef = useRef(null);
  useEffect(() => {
    if (bubbleRef.current) {
      setBubbleDimensions(bubbleRef.current.getBoundingClientRect());
    }
  }, [bubbleRef]);
  if(!user) return null; 
  return (
    <Wrapper index={index}>
      <BubbleContainer me={me}>
        <Avatar>
          <LazyLoadImage src={senderAvatar} />
        </Avatar>
        <Message me={me} ref={bubbleRef} messageType={message.messageType}>
          {message.messageType === "TEXT" ? (
            <Editor
              editorState={editorState}
              setEditorState={setEditorState}
              plugins={[linkifyPlugin, mentionPlugin]}
              onChange={setEditorState}
              readOnly
            />
          ) : message.messageType === "IMAGE" ? (
            <ImageContainer>
              <img
                src={message.file.data}
                alt={message.file.filename}
                onClick={() => setIsOpen(true)}
              />
              {isOpen && (
                <Lightbox
                  mainSrc={message.file.data}
                  onCloseRequest={() => setIsOpen(false)}
                />
              )}
            </ImageContainer>
          ) : message.messageType === "ATTACHMENT" ? (
            <AttachmentContainer>
              <a
                href={message.file.data}
                download={message.file.filename}
                title={message.file.filename}
              >
                {message.file.filename}
              </a>
            </AttachmentContainer>
          ) : null}
        </Message>
      </BubbleContainer>
      <BubbleTimeline width={bubbleDimensions.width} me={me}>
        <div>
          <span>
            {Date.now() - +message.createdAt > 3600000 * 48 ? (
              <Moment date={new Date(+message.createdAt)} format="DD/MM" />
            ) : (
              <Moment fromNow>{+message.createdAt}</Moment>
            )}
          </span>
          {user._id === message.sender._id ? (
            <span style={{ textTransform: "capitalize" }}>
              {message.receiverStatus.toLowerCase()}
            </span>
          ) : null}
        </div>
      </BubbleTimeline>
    </Wrapper>
  );
};

export default Bubble;
