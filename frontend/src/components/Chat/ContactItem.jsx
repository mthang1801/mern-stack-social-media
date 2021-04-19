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
import { GET_MESSAGES_STORAGE } from "../../apollo/operations/queries/cache";
import { FETCH_SINGLE_CHAT_CONVERSATION } from "../../apollo/chat/chat.types";
import { useQuery } from "@apollo/client";
import {setCurrentChat} from "../../apollo/chat/chat.caches"
const ContactItem = ({ friend }) => {
  const [showSetting, setShowSettings] = useState(false);
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-only" });
  const { setPopupPosition, setShowPopup } = usePopupContactActions();
  const { colorMode } = useThemeUI();
  const {
    
    addNewConversationToMessagesStorage,
  } = cacheMutations;
  const { refetch: fetchSingleChatConversation } = useQuery(
    FETCH_SINGLE_CHAT_CONVERSATION,
    {
      fetchPolicy: "network-only",
      skip: true,
    }
  );
  const onClickThreeDots = (e) => {
    e.stopPropagation();
    setShowPopup(true);
    const positionY =
      e.pageY > window.innerHeight * 0.75
        ? e.pageY - 0.25 * window.innerHeight
        : e.pageY;
    setPopupPosition({ left: e.pageX, top: positionY });
  };

  const onSetCurrentChat = async (e) => {
    if (!messagesStorage[friend._id]) {
      const { data } = await fetchSingleChatConversation({
        conversationId: friend._id,
        scope: "PERSONAL",
      });
      if (data) {
        const { fetchSingleChatConversation } = data;
        addNewConversationToMessagesStorage(
          friend._id,
          fetchSingleChatConversation
        );
      }
    }
    setCurrentChat({...friend, scope: "PERSONAL"});
  };  
  return (
    <ContactItemWrapper
      theme={colorMode}
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      onClick={onSetCurrentChat}
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
