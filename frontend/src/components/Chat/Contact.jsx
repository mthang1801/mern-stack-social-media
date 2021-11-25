import React, { useEffect, useState, useRef, createContext } from 'react';
import {
  Wrapper,
  LeftSide,
  RightSide,
  PopupSettings,
} from './styles/Chat.styles';
import { userVar } from '../../apollo/cache';
import Search from './Search';
import { useThemeUI } from 'theme-ui';
import { setCurrentChat } from '../../apollo/chat/chat.caches';
import ListContacts from './ListContacts';
import { FETCH_USER_FRIENDS_DATA } from '../../apollo/contact/contact.queries';
import { contactVar } from '../../apollo/cache';
import { pushFriendsListToContact } from '../../apollo/contact/contact.caches';
import ChatBoard from './ChatBoard';
import { useQuery, useReactiveVar } from '@apollo/client';
import constant from '../../constant/constant';
export const ContactContext = createContext({});

const Contact = () => {
  //useQuery
  const user = useReactiveVar(userVar);
  //useState
  const [search, setSearch] = useState('');
  const [contactData, setContactData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [fetched, setFetched] = useState(false);
  const contact = useReactiveVar(contactVar);
  const { refetch: fetchFriends } = useQuery(FETCH_USER_FRIENDS_DATA, {
    skip: true,
  });
  const [popupPosition, setPopupPosition] = useState({
    left: -10000,
    top: -10000,
  });
  const popupRef = useRef(null);

  useEffect(() => {
    // if (friends.length) {
    //   if (!search) {
    //     setContactData([...originData]);
    //   } else {
    //     const searchRegex = new RegExp(search, "i");
    //     const searchResults = originData.filter(
    //       ({ name }) => !!name.match(searchRegex)
    //     );
    //     setContactData([...searchResults]);
    //   }
    // }
  }, [search]);

  useEffect(() => {
    if (!contact.friends.length && !fetched) {
      fetchFriends({
        skip: 0,
        limit: constant.REACT_APP_FRIENDS_PER_LOAD,
      }).then(({ data }) => {
        pushFriendsListToContact(data.fetchFriends);
      });
    }
    // setContactData([...friends]);
    // setOriginData([...friends]);
  }, [contact, fetched]);

  useEffect(() => {
    setCurrentChat(null);
  }, []);

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
    window.addEventListener('click', (e) => {
      handleClickDotsSetting(e);
    });
    return () =>
      window.removeEventListener('click', (e) => {
        handleClickDotsSetting(e);
      });
  });
  const { colorMode } = useThemeUI();

  const onChangeSearch = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  if (!user) return null;
  return (
    <ContactContext.Provider value={{ setShowPopup, setPopupPosition }}>
      <PopupSettings
        ref={popupRef}
        show={showPopup}
        left={popupPosition.left}
        top={popupPosition.top + 50}
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
          <ListContacts data={contact.friends} />
        </LeftSide>
        <RightSide>
          <ChatBoard />
        </RightSide>
      </Wrapper>
    </ContactContext.Provider>
  );
};

export default Contact;
