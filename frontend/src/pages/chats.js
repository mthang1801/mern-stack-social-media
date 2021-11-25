import React, { lazy, useEffect, useState } from 'react';
import Layout from '../containers/Layout';
import { userVar, messagesStorageVar } from '../apollo/cache';

import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import CardRequestAuth from '../components/Card/CardRequestAuth';
import {
  RequestAuthScreen,
  ChatsWrapper,
  SidebarNav,
  MainTab,
} from './styles/chats.styles';
import MenuChat from '../components/Chat/MenuChat';
import { Route, Switch } from 'react-router-dom';
import {
  FETCH_CHAT_CONVERSATIONS,
  UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED,
} from '../apollo/chat/chat.types';

import { setInitialMessagesStorage } from '../apollo/chat/chat.caches';
import useChatSubscriptions from '../hooks/useChatSubscriptions';
import { setNumberOfConversations } from '../apollo/chat/chat.caches';
const ChatConversations = lazy(() =>
  import('../components/Chat/Conversations')
);
const ChatContacts = lazy(() => import('../components/Chat/Contact'));

const ChatsPage = ({ match }) => {
  const [fetched, setFetched] = useState(false);
  //use Query
  const user = useReactiveVar(userVar);
  const messagesStorage = useReactiveVar(messagesStorageVar);
  const { refetch: fetchChatConversations } = useQuery(
    FETCH_CHAT_CONVERSATIONS,
    {
      fetchPolicy: 'cache-and-network',
      skip: true,
    }
  );
  const [updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched] =
    useMutation(
      UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED
    );
  //useState

  useChatSubscriptions();
  useEffect(() => {
    let _isMounted = true;
    if (!Object.keys(messagesStorage).length && user && !fetch) {
      //fetch conversations
      let personalMessagesHaveReceiverSentStatus = new Set();
      fetchChatConversations().then(({ data }) => {
        if (_isMounted) {
          const { conversations, numberOfConversations } =
            data.fetchChatConversations;
          let storage = {};
          conversations.forEach((conversation) => {
            if (conversation.scope === 'PERSONAL') {
              storage[conversation.profile._id] = { ...conversation };
              if (
                conversation.latestMessage.receiver._id.toString() ===
                  user._id.toString() &&
                conversation.latestMessage.receiverStatus === 'SENT'
              ) {
                personalMessagesHaveReceiverSentStatus.add(
                  conversation.latestMessage.sender._id
                );
              }
            }
          });

          setInitialMessagesStorage({ ...storage });
          //update those conversations to received when user online if he/she has offlined before
          if (personalMessagesHaveReceiverSentStatus.size) {
            updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched({
              variables: {
                listSenderId: [...personalMessagesHaveReceiverSentStatus],
              },
            });
          }
          setNumberOfConversations(numberOfConversations);
        }
      });
      setFetched(true);
    }
    return () => (_isMounted = false);
  }, [user, messagesStorage, fetched]);
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
      <ChatsWrapper>
        <SidebarNav>
          <MenuChat />
        </SidebarNav>
        <MainTab>
          <Switch>
            <Route exact path={match.path} component={ChatConversations} />
            <Route
              exact
              path={`${match.path}/contacts`}
              component={ChatContacts}
            />
          </Switch>
        </MainTab>
      </ChatsWrapper>
    </Layout>
  );
};

export default ChatsPage;
