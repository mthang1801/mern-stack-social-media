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
  BubbleTimeline
} from "./styles/Bubble.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { convertFromRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createMentionPlugin from "@draft-js-plugins/mention";
import Moment from "react-moment"
const linkifyPlugin = createLinkifyPlugin({
  target: "_blank",
  rel: "noopener noreferrer",
});
const mentionPlugin = createMentionPlugin({
  mentionComponent({ mention }) {   
    return (
      <MentionWrapper to={`/${mention.slug}`}>
        <MentionLinkInfo to={`/${mention.slug}`}>
          <MentionAvatar src={mention.avatar}/>
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
const Bubble = ({ data, me, senderAvatar, index }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(data.text)))
  );
  const [bubbleDimensions, setBubbleDimensions] = useState({width: 0, height: 0, x : 0, y : 0});
  const bubbleRef = useRef(null)
  useEffect(() => {
    if(bubbleRef.current){
      setBubbleDimensions(bubbleRef.current.getBoundingClientRect());
    }
  },[bubbleRef])
  return (
    <Wrapper index={index}>
      <BubbleContainer me={me} >
        <Avatar>
          <LazyLoadImage src={senderAvatar} />
        </Avatar>
        <Message me={me} ref={bubbleRef}>
          {data.messageType === "TEXT" ? (
            <Editor
              editorState={editorState}
              setEditorState={setEditorState}
              plugins={[linkifyPlugin, mentionPlugin]}
              onChange={setEditorState}
              readOnly
            />
          ) : null}
        </Message>
      </BubbleContainer>
      <BubbleTimeline width={bubbleDimensions.width}>
       <div>
       <span>{Date.now() - +data.createdAt > 3600000 ? (
              <Moment date={new Date(+data.createdAt)} format="DD/MM/YYYY hh:mm" />
            ) : (
              <Moment fromNow>{+data.createdAt}</Moment>
            )}</span>
        <span>Delivered</span>
       </div>
      </BubbleTimeline>
    </Wrapper>
  );
};

export default Bubble;
