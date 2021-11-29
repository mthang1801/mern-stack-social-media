import React, { useState } from 'react';
import {
  Wrapper,
  UserInfo,
  UserName,
  UserSetting,
  SettingIcon,
  SettingDialog,
  SettingItem,
} from './styles/ContactItem.styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../../theme';
import { BsThreeDots } from 'react-icons/bs';
import { usePopupContactActions } from './usePopupActions';

const ContactItem = ({ friend }) => {
  const [showSetting, setShowSetting] = useState(false);
  const { theme } = useTheme();
  const { setCurrentSettingElement, currentSettingElement } =
    usePopupContactActions();

  const onGetSettingPosition = (id) => {
    setCurrentSettingElement(id);
  };
  return (
    <Wrapper
      theme={theme}
      onMouseEnter={() => setShowSetting(true)}
      onMouseLeave={() => setShowSetting(false)}
    >
      <UserInfo>
        <LazyLoadImage
          src={friend.avatar}
          alt={friend.avatar}
          effect="blur"
          width="42px"
          height="42px"
        />
        <UserName>
          {friend.name}-{friend._id.slice(-6)}
        </UserName>
      </UserInfo>
      <UserSetting
        id={`contact-setting-${friend._id}`}
        aria-label="contact-setting"
        show={
          showSetting ||
          currentSettingElement === `contact-setting-${friend._id}`
        }
        onClick={() => onGetSettingPosition(`contact-setting-${friend._id}`)}
      >
        <SettingIcon>
          <BsThreeDots />
        </SettingIcon>
      </UserSetting>
    </Wrapper>
  );
};

export default ContactItem;
