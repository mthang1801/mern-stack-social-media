import React, { useEffect, useState, useRef, createContext } from "react";
import {
  Wrapper,
  LeftSide,
  RightSide,
  PopupSettings,
} from "./styles/Chat.styles";
import {
  GET_CURRENT_USER,
  GET_FRIENDS,  
} from "../../apollo/operations/queries/cache";
import {
  FETCH_FRIENDS,
} from "../../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import Search from "./Search";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../../apollo/operations/mutations";
import ListContacts from "./ListContacts";
import ChatBoard from "./ChatBoard";
export const ContactContext = createContext({});

const Contact = () => {
  //useQuery
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });  
  const { setFriends } = cacheMutations;  

  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-only" });
  const { refetch: fetchFriends } = useQuery(FETCH_FRIENDS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
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
    let _mounted = true;
    if (!friends.length) {
      fetchFriends({
        skip: 0,
        limit: +process.env.REACT_APP_FRIENDS_PER_LOAD,
      }).then(({ data }) => {
        if (_mounted) {
          const { fetchFriends } = data;
          //add status PERSONAL to each friends because  when click contact item, it will link to current
          //chat which need status
          const friends = fetchFriends.map((friend) => ({
            ...friend,
            scope: "PERSONAL",
          }));
          setFriends([...friends]);
          setContactData([...friends]);
          setOriginData([...friends]);
        }
      });
    }
    return () => (_mounted = false);
  }, [friends]);
  

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
  }, [search,friends]);
  

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

  if (!user) return null;
  return (
    <ContactContext.Provider value={{ setShowPopup, setPopupPosition }}>
      <PopupSettings
        ref={popupRef}
        show={showPopup}
        left={popupPosition.left}
        top={popupPosition.top}
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
          <Search search={search} onChange={(e) => setSearch(e.target.value)} />
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
