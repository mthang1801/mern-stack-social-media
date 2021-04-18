import React, { useEffect, useState, useRef, createContext } from "react";
import {
  Wrapper,
  LeftSide,
  RightSide,
  PopupSettings,
} from "./styles/Chat.styles";
import {
  GET_FRIENDS,
} from "../../apollo/operations/queries/cache";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/cache";
import Search from "./Search";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../../apollo/operations/mutations";
import ListContacts from "./ListContacts";
import ChatBoard from "./ChatBoard";
export const ContactContext = createContext({});

const Contact = () => {
  //useQuery
  const user = useReactiveVar(userVar);
  const { setCurrentChat } = cacheMutations;

  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-only" });
  
  //useState
  const [search, setSearch] = useState("");
  const [contactData, setContactData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    left: -10000,
    top: -10000,
  });
  const popupRef = useRef(null);

  useEffect(() => {
    if (friends.length) {
      if (!search) {
        setContactData([...originData]);
      } else {
        const searchRegex = new RegExp(search, "i");
        const searchResults = originData.filter(
          ({ name }) => !!name.match(searchRegex)
        );
        setContactData([...searchResults]);
      }
    }
  }, [search, friends]);

  useEffect(() => {    
    setContactData([...friends]);
    setOriginData([...friends]);    
  }, [friends]);

  useEffect(() => {
    setCurrentChat(null);
  },[])

  useEffect(() => {
    function handleClickDotsSetting(e) {
      const dotsElements = document.querySelectorAll(
        `[aria-label="chat-contact-settings"]`
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
  const { colorMode } = useThemeUI();

  const onChangeSearch = React.useCallback((e) => {
    setSearch(e.target.value);
  },[])
  if (!user) return null;
  return (
    <ContactContext.Provider value={{ setShowPopup, setPopupPosition }}>
      <PopupSettings
        ref={popupRef}
        show={showPopup}
        left={popupPosition.left}
        top={popupPosition.top+50}
      >
        <span>Mark as favorite</span>
        <hr />
        <span>Label</span>
        <span>Set alias</span>
        <hr />
        <span>Block</span>
        <span>Delete</span>
      </PopupSettings>
      <Wrapper theme={colorMode}>
        <LeftSide theme={colorMode}>
          <Search search={search} onChange={onChangeSearch} />
          <hr />
          <ListContacts data={contactData.length ? contactData : friends} />
        </LeftSide>
        <RightSide>
          <ChatBoard />
        </RightSide>
      </Wrapper>
    </ContactContext.Provider>
  );
};

export default Contact;
