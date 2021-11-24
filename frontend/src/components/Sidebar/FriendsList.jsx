import React, { useState, useRef, useEffect } from 'react';
import {
  FriendsListWrapper,
  TitleContacts,
  FriendsListSearch,
  FriendsListTitle,
} from './Sidebar.styles';
import { useThemeUI } from 'theme-ui';
import { userVar, contactVar } from '../../apollo/cache';
import { useQuery, useReactiveVar } from '@apollo/client';
import { FETCH_USER_FRIENDS_DATA } from '../../apollo/contact/contact.types';
import { pushFriendsListToContact } from '../../apollo/contact/contact.caches';
import FriendItem from './FriendItem';
import { Scrollbars } from 'react-custom-scrollbars';
import useLanguage from '../Global/useLanguage';
import { FaSearch } from 'react-icons/fa';

const FriendsList = ({ show }) => {
  const { colorMode } = useThemeUI();
  const [openSearch, setOpenSearch] = useState(false);
  const user = useReactiveVar(userVar);
  const contact = useReactiveVar(contactVar);
  const inputRef = useRef(null);
  const { i18n, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { refetch: fetchUserFriends } = useQuery(FETCH_USER_FRIENDS_DATA, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    skip: true,
  });

  useEffect(() => {
    let _isMounted = true;
    if (!contact.friends.length && !fetched && show) {
      setLoading(true);
      fetchUserFriends().then(({ data }) => {
        if (data && _isMounted) {
          pushFriendsListToContact(data.fetchFriends);
          setLoading(false);
          setFetched(true);
        }
      });
    }
    return () => (_isMounted = false);
  }, [fetchUserFriends, contact, fetched, show]);

  useEffect(() => {
    if (openSearch) {
      inputRef.current.focus();
    }
  }, [openSearch]);
  const onClickSearchButton = () => {
    inputRef.current.focus();
    setOpenSearch(true);
  };

  console.log(contact);
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeightMin={0}
      autoHeightMax={200}
    >
      <FriendsListWrapper show={show} theme={colorMode}>
        <TitleContacts>
          <FriendsListTitle hide={openSearch}>
            {i18n.store.data[lang].translation.contacts.contactsList}
          </FriendsListTitle>
          <FriendsListSearch show={openSearch} theme={colorMode}>
            <input
              ref={inputRef}
              type="text"
              placeholder={i18n.store.data[lang].translation.controls.search}
              onBlur={() => setOpenSearch(false)}
            />
            <button onClick={onClickSearchButton}>
              <FaSearch />
            </button>
          </FriendsListSearch>
        </TitleContacts>
        {loading && <div>Loading Friends</div>}
        {contact.friends &&
          contact.friends.map((friend) => (
            <FriendItem key={friend._id} data={friend} />
          ))}
      </FriendsListWrapper>
    </Scrollbars>
  );
};

export default FriendsList;
