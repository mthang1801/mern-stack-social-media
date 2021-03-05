import React, { useState } from "react";
import {
  ContactItemWrapper,
  Avatar,
  UserContactOverview,
  ContactControls,
} from "./styles/ContactItem.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsThreeDots } from "react-icons/bs";
import { useThemeUI } from "theme-ui";
const ContactItem = ({ friend }) => {
  const [showSetting, setShowSettings] = useState(false);

  const { colorMode } = useThemeUI();
  return (
    <ContactItemWrapper theme={colorMode}>
      <Avatar>
        <LazyLoadImage src={friend.avatar} />
      </Avatar>
      <UserContactOverview>
        {friend.name}
      </UserContactOverview>
      <ContactControls
        show={showSetting}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
      >       
        <span>
          <BsThreeDots />
        </span>
      </ContactControls>
    </ContactItemWrapper>
  );
};

export default ContactItem;
