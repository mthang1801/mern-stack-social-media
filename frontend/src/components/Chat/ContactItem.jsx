import React, { useState, useContext, useRef } from "react";
import {
  ContactItemWrapper,
  Avatar,
  UserContactOverview,
  ContactControls,
} from "./styles/ContactItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useThemeUI } from "theme-ui";
import { usePopupContactActions } from "./hook/usePopupActions";
import ThreeDotsSetting from "../UI/ThreeDotsSetting";
import { cacheMutations } from "../../apollo/operations/mutations";

const ContactItem = ({ friend }) => {
  const [showSetting, setShowSettings] = useState(false);
  const { setPopupPosition, setShowPopup } = usePopupContactActions();
  const { colorMode } = useThemeUI();
  const { setCurrentChat } = cacheMutations;
  const onClickThreeDots = (e) => {
    e.stopPropagation();
    setShowPopup(true);
    const positionY =
      e.pageY > window.innerHeight * 0.75
        ? e.pageY - 0.25 * window.innerHeight
        : e.pageY;
    setPopupPosition({ left: e.pageX, top: positionY });
  };

  return (
    <ContactItemWrapper
      theme={colorMode}
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      onClick={() => setCurrentChat(friend)}
    >
      <Avatar active={friend.isOnline}>
        <LazyLoadImage src={friend.avatar} />
      </Avatar>
      <UserContactOverview>{friend.name}</UserContactOverview>
      <ContactControls
        show={showSetting}
        onClick={(e) => onClickThreeDots(e)}
        aria-label="chat-contact-settings"
      >
        <ThreeDotsSetting />
      </ContactControls>
    </ContactItemWrapper>
  );
};

export default React.memo(ContactItem);
