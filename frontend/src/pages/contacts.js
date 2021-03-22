import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_PAGE_CACHE_DATA } from "../apollo/operations/queries/cache";
import {
  FETCH_LIST_CONTACT,
  FETCH_FRIENDS,
} from "../apollo/operations/queries/user";
import { cacheMutations } from "../apollo/operations/mutations";
import MainBody from "../components/Body/MainBody";
import {
  MainContent,
  MainContentFullSize,
  ContactTitle,
} from "./styles/pages.styles";
import SentRequestsToAddFriend from "../components/Contact/SentRequestsToAddFriend";
import ReceivedRequestsToAddFriend from "../components/Contact/ReceivedRequestsToAddFriend";
import FriendsList from "../components/Contact/FriendsList";
import useLanguage from "../components/Global/useLanguage";

const FriendsPage = () => {
  const [loadingMore, setLoadingMore] = useState(false);  
  const { i18n, lang } = useLanguage();
  const {
    data: {
      user,
      friends,
      sentRequestsToAddFriend,
      receivedRequestsToAddFriend,
    },
  } = useQuery(GET_CONTACT_PAGE_CACHE_DATA); 
  const { refetch: fetchFriends } = useQuery(FETCH_FRIENDS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });

  const {
    setFriends,
    setSentRequestsToAddFriend,
    setReceivedRequestsToAddFriend,
  } = cacheMutations;

  const { refetch: fetchListContact } = useQuery(FETCH_LIST_CONTACT, {
    skip: true,
  });

  useEffect(() => {
    let _isMounted = true;
    if (
      !sentRequestsToAddFriend.length &&
      !receivedRequestsToAddFriend.length
    ) {
      if (
        user?.sentRequestToAddFriend.length ||
        user?.receivedRequestToAddFriend.length ||
        user?.friends.length
      ) {
        fetchListContact().then(({ data }) => {
          if (_isMounted) {
            const {
              sentRequests,
              receivedRequests,
              friends: friendsList,
            } = data.fetchListContact;
            if (sentRequests.length) {
              setSentRequestsToAddFriend([...sentRequests]);
            }
            if (receivedRequests.length) {
              setReceivedRequestsToAddFriend([...receivedRequests]);
            }
            if (!friends.length) {
              setFriends([...friendsList]);
            }
          }
        });
      }
    }
    return () => _isMounted = false ;
  }, [user]);

  useEffect(() => {
    window.addEventListener("scroll", async (e) => {
      const docEl = document.documentElement;
      if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {
        setLoadingMore(true);
      }
    });
    return () =>
      window.removeEventListener("scroll", async (e) => {
        const docEl = document.documentElement;
        if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {
          setLoadingMore(true);
        }
      });
  }, []);

  useEffect(() => {
    let _isMounted = true;  
    if (loadingMore) {
      const skip = friends.length;
      const limit = +process.env.REACT_APP_FRIENDS_PER_LOAD;
      fetchFriends({ skip, limit }).then(({ data }) => {
        if (data?.fetchFriends?.length && _isMounted) {
          setFriends([...friends, ...data.fetchFriends]);
          setLoadingMore(false);
        }
      });
    }
    return () => _isMounted = false ;
  }, [loadingMore]);

  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentFullSize>
            <ContactTitle>
              {i18n.store.data[lang].translation.contacts.title}
            </ContactTitle>
            <SentRequestsToAddFriend />
            <ReceivedRequestsToAddFriend />
            <FriendsList />
          </MainContentFullSize>
        </MainContent>
      </MainBody>
    </Layout>
  );
};

export default FriendsPage;
