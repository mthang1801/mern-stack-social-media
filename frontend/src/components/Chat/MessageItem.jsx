import React, { useState, useRef } from "react";
import {
  MessageItemWrapper,
  Avatar,
  UserMessageOverview,
  MessageControls,
} from "./styles/MessageItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Moment from "react-moment";
import {usePopupMessagesActions} from "./hook/usePopupActions"
import { useThemeUI } from "theme-ui";
import ThreeDotsSetting from "../UI/ThreeDotsSetting"
const MessageItem = ({ friend }) => {
  const [showSetting, setShowSettings] = useState(false);
  const {setPopupPosition, setShowPopup} = usePopupMessagesActions()
  const { colorMode } = useThemeUI();
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
    <MessageItemWrapper theme={colorMode}>
      <Avatar>
        <LazyLoadImage src={friend.avatar} />
      </Avatar>
      <UserMessageOverview>
        <h4>{friend.name}</h4>
        <span>
          {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga fugit, eius natus iure libero reprehenderit velit sequi sint molestiae omnis".slice(
            0,
            20
          ) + "..."}
        </span>
      </UserMessageOverview>
      <MessageControls
        show={showSetting}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
      >
        <Moment date={new Date()} format={"DD/MM/YYYY"} />
        <div aria-label="chat-messages-settings"  onClick={(e) => onClickThreeDots(e)}>
          <ThreeDotsSetting />
        </div>
      </MessageControls>
    </MessageItemWrapper>
  );
};

export default MessageItem;
