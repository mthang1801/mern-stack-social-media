import React, { useState, useRef } from "react";
import {
  MessageItemWrapper,
  Avatar,
  UserMessageOverview,
  MessageControls,
} from "./styles/MessageItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {cacheMutations} from "../../apollo/operations/mutations"
import Moment from "react-moment";
import {usePopupMessagesActions} from "./hook/usePopupActions"
import { useThemeUI } from "theme-ui";
import ThreeDotsSetting from "../UI/ThreeDotsSetting"

const MessageItem = ({ messenger, latestTime, active }) => {
  console.log(active)
  const [showSetting, setShowSettings] = useState(false);
  const {setPopupPosition, setShowPopup} = usePopupMessagesActions()
  const { colorMode } = useThemeUI();
  const {setCurrentChat} = cacheMutations
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
    <MessageItemWrapper theme={colorMode} active={active} onClick={() => setCurrentChat(messenger)}>
      <Avatar>
        <LazyLoadImage src={messenger.avatar} />
      </Avatar>
      <UserMessageOverview>
        <h4>{messenger.name}</h4>
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
        <div style={{textAlign:"right"}}>
        {Date.now() - +latestTime > 3600000 ? (
              <Moment date={new Date(+latestTime)} format="DD/MM/YYYY hh:mm" />
            ) : (
              <Moment fromNow>{+latestTime}</Moment>
            )}
        </div>
        <div aria-label="chat-messages-settings"  onClick={(e) => onClickThreeDots(e)}>
          <ThreeDotsSetting />
        </div>
      </MessageControls>
    </MessageItemWrapper>
  );
};

export default MessageItem;
