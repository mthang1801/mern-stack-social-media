import React, { useState, useRef } from "react";
import {
  MessageItemWrapper,
  Avatar,
  UserMessageOverview,
  MessageControls,
} from "./styles/MessageItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { cacheMutations } from "../../apollo/operations/mutations";
import Moment from "react-moment";
import { usePopupMessagesActions } from "./hook/usePopupActions";
import { useThemeUI } from "theme-ui";
import ThreeDotsSetting from "../UI/ThreeDotsSetting";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
const MessageItem = ({
  messenger,
  latestMessage,
  active,
  status,
  hasSeenLatestMessage,
}) => {
  const [showSetting, setShowSettings] = useState(false);
  const { setPopupPosition, setShowPopup } = usePopupMessagesActions();
  const { colorMode } = useThemeUI();
  const { setCurrentChat } = cacheMutations;
  const onClickThreeDots = (e) => {
    e.preventDefault();
    setShowPopup(true);
    const positionY =
      e.pageY > window.innerHeight * 0.75
        ? e.pageY - 0.25 * window.innerHeight
        : e.pageY;
    setPopupPosition({ left: e.pageX, top: positionY });
  };
  
  return (
    <MessageItemWrapper
      theme={colorMode}
      active={active}
      hasSeenLatestMessage={hasSeenLatestMessage}
      onClick={() => setCurrentChat({ ...messenger, status })}
    >
      <Avatar>
        <LazyLoadImage src={messenger.avatar} />
      </Avatar>
      <UserMessageOverview>
        <h4>{messenger.name}</h4>
        <span>
          {latestMessage.messageType === "TEXT"
            ? EditorState.createWithContent(
                convertFromRaw(JSON.parse(latestMessage.text))
              )
                .getCurrentContent()
                .getPlainText().slice(0, 20) + "..."
            : latestMessage === "PICTURE"
            ? "a picture"
            : "a file"}
        </span>
      </UserMessageOverview>
      <MessageControls
        show={showSetting}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
        hasSeenLatestMessage={hasSeenLatestMessage}
      >
        <div style={{ textAlign: "right" }}>
          {Date.now() - +latestMessage.createdAt > 3600000 ? (
            <Moment
              date={new Date(+latestMessage.createdAt)}
              format="DD/MM/YYYY"
            />
          ) : (
            <Moment fromNow>{+latestMessage.createdAt}</Moment>
          )}
        </div>
        <div
          aria-label="chat-messages-settings"
          onClick={(e) => onClickThreeDots(e)}
        >
          <ThreeDotsSetting />
        </div>
      </MessageControls>
    </MessageItemWrapper>
  );
};

export default MessageItem;
