import React, { useEffect, useState } from 'react';
import Layout from '../containers/Layout';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar, contactVar } from '../apollo/cache';
import { FETCH_LIST_CONTACT } from '../apollo/contact/contact.types';
import {
  FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND,
  FETCH_SENT_REQUEST_TO_ADD_FRIEND,
} from '../apollo/contact/contact.types';

import {
  setContactList,
  fetchMoreSentRequestsToAddFriend,
  fetchMoreReceivedRequestsToAddFriend,
} from '../apollo/contact/contact.caches';
import MainBody from '../containers/MainBody';
import {
  MainContent,
  MainContentFullSize,
  ContactTitle,
} from './styles/pages.styles';
import SentRequestsToAddFriend from '../components/Contact/SentRequestsToAddFriend';
import ReceivedRequestsToAddFriend from '../components/Contact/ReceivedRequestsToAddFriend';
import FriendsList from '../components/Contact/FriendsList';
import useLocale from '../locales';
import constant from '../constant/constant';
const FriendsPage = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { translation } = useLocale();
  const user = useReactiveVar(userVar);
  const contact = useReactiveVar(contactVar);

  const { refetch: fetchListContact } = useQuery(FETCH_LIST_CONTACT, {
    skip: true,
  });
  const { refetch: fetchReceivedRequestsToAddFriend } = useQuery(
    FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND,
    { skip: true }
  );
  const { refetch: fetchSentRequestToAddFriend } = useQuery(
    FETCH_SENT_REQUEST_TO_ADD_FRIEND,
    { skip: true }
  );
  useEffect(() => {
    if (!fetched && user) {
      if (
        user?.sentRequestToAddFriend.length ||
        user?.receivedRequestToAddFriend.length ||
        user?.friends.length
      ) {
        fetchListContact()
          .then(({ data }) => {
            setFetched(true);
            const { sentRequests, receivedRequests, friends } =
              data.fetchListContact;

            setContactList(friends, receivedRequests, sentRequests);
          })
          .catch((err) => {
            setFetched(true);
            console.log(err);
          });
      }
    }
  }, [user, fetched, setFetched]);

  useEffect(() => {
    let _isMounted = true;
    if (fetched) {
      const limit = constant.REACT_APP_USERS_CONTACT_PER_LOAD;
      if (
        contact.sentRequestsToAddFriend.length <= 1 &&
        user.sentRequestToAddFriend.length > 1
      ) {
        const skip = contact.sentRequestsToAddFriend.length;

        fetchSentRequestToAddFriend({ skip, limit }).then(({ data }) => {
          if (data?.fetchSentRequestToAddFriend?.length && _isMounted) {
            fetchMoreSentRequestsToAddFriend(data.fetchSentRequestToAddFriend);
          }
        });
      }
      if (
        contact.receivedRequestsToAddFriend.length <= 1 &&
        user.receivedRequestToAddFriend.length > 1
      ) {
        const skip = contact.receivedRequestsToAddFriend.length;
        fetchReceivedRequestsToAddFriend({ skip, limit }).then(({ data }) => {
          if (data?.fetchReceivedRequestToAddFriend?.length && _isMounted) {
            fetchMoreReceivedRequestsToAddFriend(
              data.fetchReceivedRequestToAddFriend
            );
          }
        });
      }
    }

    return () => (_isMounted = false);
  }, [fetched, contact, user, fetchSentRequestToAddFriend]);

  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentFullSize>
            <ContactTitle>{translation.contacts.title}</ContactTitle>
            {user && contact.sentRequestsToAddFriend.length ? (
              <SentRequestsToAddFriend
                user={user}
                sentRequestsToAddFriend={contact.sentRequestsToAddFriend}
              />
            ) : null}
            {user && contact.receivedRequestsToAddFriend.length ? (
              <ReceivedRequestsToAddFriend
                user={user}
                receivedRequestsToAddFriend={
                  contact.receivedRequestsToAddFriend
                }
              />
            ) : null}
            {user && contact.friends.length ? (
              <FriendsList user={user} friends={contact.friends} />
            ) : null}
          </MainContentFullSize>
        </MainContent>
      </MainBody>
    </Layout>
  );
};

export default FriendsPage;
