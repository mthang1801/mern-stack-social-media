import React, { useState, useEffect, createContext, useRef } from "react";
import {
  Wrapper,
  LeftSide,
  RightSide,
  PopupSettings,
} from "./styles/Chat.styles";
import {
  GET_CURRENT_USER,
  GET_MESSAGES_STORAGE,
} from "../../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import Search from "./Search";
import ListMessages from "./ListMessages";
import { useThemeUI } from "theme-ui";
import ChatBoard from "./ChatBoard";


export const MessagesContext = createContext({});
const Messages = () => {
  //query
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });  
 
  //state
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    left: -10000,
    top: -10000,
  });
  const { colorMode } = useThemeUI();
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickDotsSetting(e) {
      const dotsElements = document.querySelectorAll(
        `[aria-label="chat-messages-settings"]`
      );
      let flag = false;
      for (let s of dotsElements) {
        if (s.contains(e.target)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    }
    window.addEventListener("click", (e) => {
      handleClickDotsSetting(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        handleClickDotsSetting(e);
      });
  });

  

  if (!user) return null;
  return (
    <MessagesContext.Provider value={{ setShowPopup, setPopupPosition }}>
      <PopupSettings
        ref={popupRef}
        show={showPopup}
        left={popupPosition.left}
        top={popupPosition.top}
      >
        <span>Pin this conversation</span>
        <hr />
        <span>Label</span>
        <hr />
        <span>Add to group</span>
        <span>Turn notification off</span>
        <hr />
        <span>Delete conversation</span>
        <hr />
        <span>Report</span>
      </PopupSettings>
      <Wrapper theme={colorMode}>
        <LeftSide theme={colorMode}>
          <Search />
          <hr />
          <ListMessages />
        </LeftSide>
        <RightSide>
          <ChatBoard />
        </RightSide>
      </Wrapper>
    </MessagesContext.Provider>
  );
};

export default Messages;
