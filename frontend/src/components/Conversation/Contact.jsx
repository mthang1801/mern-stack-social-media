import React, { useEffect, createContext, useState, useRef } from 'react';
import {
  LeftSide,
  RightSide,
  NotFound,
  SettingDialog,
} from './styles/Conversation.styles';

import { userVar, contactVar } from '../../apollo/cache';
import { useReactiveVar, useQuery } from '@apollo/client';

import constant from '../../constant/constant';

import Search from './Contact/Search';
import ContactList from './Contact/ContactList';
import useLocale from '../../locales';
import { useTheme } from '../../theme';

export const ContactContext = createContext({});

const Contact = () => {
  const { theme } = useTheme();
  const user = useReactiveVar(userVar);
  const contact = useReactiveVar(contactVar);
  const [friendContact, setFriendContact] = useState(contact.friends);
  // Get all coordinates of elements
  const [rects, setRects] = useState({});
  // create current setting element to catch id of element
  const [currentSettingElement, setCurrentSettingElement] = useState(null);

  const settingDialogRef = useRef(null);
  const {
    translation: {
      search,
      conversations: {
        contact: { dialog },
      },
    },
  } = useLocale();

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[aria-label='contact-setting']"
    );
    let listRect = {};
    for (let element of elements) {
      const clientRect = element.getBoundingClientRect();
      const id = element.getAttribute('id');
      const { x, y, width, height, top, bottom, left, right } = clientRect;
      listRect[id] = { x, y, width, height, top, bottom, left, right };
    }
    setRects({ ...listRect });
  }, [contact]);

  useEffect(() => {
    function handleClickOutsiteSettingDialog(e) {
      if (currentSettingElement) {
        let isContained = false;
        for (let id of Object.keys(rects)) {
          const element = document.getElementById(id);
          if (element?.contains(e.target)) {
            isContained = true;
            break;
          }
        }
        console.log(isContained);
        if (!isContained) {
          setCurrentSettingElement(null);
        }
      }
    }

    window.addEventListener('click', (e) => handleClickOutsiteSettingDialog(e));
    return () =>
      window.removeEventListener('click', (e) =>
        handleClickOutsiteSettingDialog(e)
      );
  });

  console.log(friendContact);

  return (
    <ContactContext.Provider
      value={{
        setCurrentSettingElement,
        currentSettingElement,
      }}
    >
      <SettingDialog
        theme={theme}
        ref={settingDialogRef}
        show={!!currentSettingElement}
        left={
          currentSettingElement && rects[currentSettingElement]
            ? rects[currentSettingElement].left + 25
            : -10000
        }
        top={
          currentSettingElement && rects[currentSettingElement]
            ? rects[currentSettingElement].top + 20
            : -10000
        }
      >
        <p>{dialog.markFavorite}</p>
        <hr />
        <p>{dialog.viewInformation}</p>
        <p>{dialog.setLabel}</p>
        <hr />
        <p>{dialog.removeFriend}</p>
      </SettingDialog>
      <LeftSide>
        <Search
          setFriendContact={setFriendContact}
          friendContact={contact.friends}
        />
        {friendContact.length ? (
          <ContactList data={friendContact} />
        ) : (
          <NotFound>{search.notfound}</NotFound>
        )}
      </LeftSide>
      <RightSide>sad</RightSide>
    </ContactContext.Provider>
  );
};

export default Contact;
