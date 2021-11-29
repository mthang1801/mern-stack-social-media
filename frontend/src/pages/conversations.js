import React, { lazy, useEffect, useState } from 'react';
import Layout from '../containers/Layout';
import { userVar, messagesStorageVar, contactVar } from '../apollo/cache';

import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import CardRequestAuth from '../components/Card/CardRequestAuth';

import {
  RequestAuthScreen,
  ConversationsWrapper,
  Tabs,
  Tab,
  MainSide,
} from './styles/conversations.styles';
import useLocale from '../locales';
import { useTheme } from '../theme';
import Conversation from '../components/Conversation/Conversation';
import Contact from '../components/Conversation/Contact';
import Group from '../components/Conversation/Group';
import { FETCH_USER_FRIENDS_DATA } from '../apollo/contact/contact.queries';
import { pushFriendsListToContact } from '../apollo/contact/contact.caches';
import constant from '../constant/constant';
import AlertDevelopingDialog from '../components/UI/AlertDevelopingDialog';
const Conversations = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const contact = useReactiveVar(contactVar);
  const user = useReactiveVar(userVar);
  const { theme } = useTheme();
  const {
    translation: { conversationMenus },
  } = useLocale();

  const { loading } = useQuery(FETCH_USER_FRIENDS_DATA, {
    fetchPolicy: 'network-only',
    variables: {
      skip: 0,
      limit: constant.REACT_APP_FRIENDS_PER_LOAD,
    },
    onCompleted: ({ fetchFriends }) => {
      pushFriendsListToContact(fetchFriends);
    },
  });

  if (process.env.NODE_ENV !== 'development') return <AlertDevelopingDialog />;

  if (!user)
    return (
      <Layout>
        <RequestAuthScreen>
          <CardRequestAuth />
        </RequestAuthScreen>
      </Layout>
    );

  return (
    <Layout>
      <ConversationsWrapper>
        <Tabs theme={theme}>
          {conversationMenus.map((conversationItem, idx) => (
            <Tab
              theme={theme}
              key={conversationItem.key}
              onClick={() => setTabIndex(idx)}
              active={tabIndex === idx}
            >
              {conversationItem.icon()}
            </Tab>
          ))}
        </Tabs>
        <MainSide>
          {tabIndex === 0 && <Conversation />}
          {tabIndex === 1 && <Contact />}
          {tabIndex === 2 && <Group />}
        </MainSide>
      </ConversationsWrapper>
    </Layout>
  );
};

export default Conversations;
