import React, { useState } from 'react';
import {
  ConversationItemWrapper,
  Avatar,
  ConversationOverview,
  ConversationControls,
} from './styles/ConversationItem.styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Moment from 'react-moment';
import { usePopupMessagesActions } from './hook/usePopupActions';
import { useTheme } from '../../theme';
import ThreeDotsSetting from '../UI/ThreeDotsSetting';
import { convertFromRaw, EditorState } from 'draft-js';
import { UPDATE_HAVE_SEEN_ALL_MESSAGES } from '../../apollo/chat/chat.types';
import {
  setCurrentChat,
  updateHasSeenLatestMessage,
} from '../../apollo/chat/chat.caches';
import { useMutation } from '@apollo/client';

const MessageItem = ({
  conversation,
  latestMessage,
  active,
  scope,
  hasSeenLatestMessage,
}) => {
  const [showSetting, setShowSettings] = useState(false);
  const { setPopupPosition, setShowPopup } = usePopupMessagesActions();
  const { theme } = useTheme();
  const [updateHaveSeenAllMessages] = useMutation(
    UPDATE_HAVE_SEEN_ALL_MESSAGES
  );

  const onClickThreeDots = (e) => {
    e.preventDefault();
    setShowPopup(true);
    const positionY =
      e.pageY > window.innerHeight * 0.75
        ? e.pageY - 0.25 * window.innerHeight
        : e.pageY;
    setPopupPosition({ left: e.pageX, top: positionY });
  };
  const onClickConversationItem = (e) => {
    setCurrentChat({ ...conversation, scope });
    updateHaveSeenAllMessages({
      variables: { conversationId: conversation._id, scope },
    }).then((res) => {
      updateHasSeenLatestMessage(conversation._id);
    });
  };
  return (
    <ConversationItemWrapper
      theme={theme}
      active={active}
      hasSeenLatestMessage={hasSeenLatestMessage}
      onClick={onClickConversationItem}
    >
      <Avatar active={conversation.isOnline}>
        <LazyLoadImage src={conversation.avatar} />
      </Avatar>
      <ConversationOverview>
        <h4>{conversation.name}</h4>
        <small>
          {latestMessage.messageType === 'TEXT'
            ? EditorState.createWithContent(
                convertFromRaw(JSON.parse(latestMessage.text))
              )
                .getCurrentContent()
                .getPlainText()
                .slice(0, 30) + '...'
            : latestMessage === 'PICTURE'
            ? 'sent an image'
            : 'sent an attachment'}
        </small>
      </ConversationOverview>
      <ConversationControls
        show={showSetting}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
        hasSeenLatestMessage={hasSeenLatestMessage}
      >
        <div style={{ textAlign: 'right' }}>
          <Moment fromNow>{+latestMessage.createdAt}</Moment>
        </div>
        <div
          aria-label="chat-messages-settings"
          onClick={(e) => onClickThreeDots(e)}
        >
          <ThreeDotsSetting />
        </div>
      </ConversationControls>
    </ConversationItemWrapper>
  );
};

export default MessageItem;
