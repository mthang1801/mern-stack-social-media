import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar, friendsVar } from "../apollo/cache";
import {
  FETCH_LIST_CONTACT,
  FETCH_USER_FRIENDS_DATA,
} from "../apollo/user/user.types";
import {
  setFriends,
  setSentRequestsToAddFriend,
  setReceivedRequestsToAddFriend,
} from "../apollo/user/user.caches";
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
  const [fetched, setFetched] = useState(false);
  const { i18n, lang } = useLanguage();
  const user = useReactiveVar(userVar);
  const friends = useReactiveVar(friendsVar);
  const { refetch: fetchFriends } = useQuery(FETCH_USER_FRIENDS_DATA, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });

  const { refetch: fetchListContact } = useQuery(FETCH_LIST_CONTACT, {
    skip: true,
  });

  useEffect(() => {
    if (!fetched) {
      if (
        user?.sentRequestToAddFriend.length ||
        user?.receivedRequestToAddFriend.length ||
        user?.friends.length
      ) {
        fetchListContact().then(({ data }) => {
          setFetched(true);
          console.log("fetched");
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
        });
      }
    }
  }, [user, fetched, setFetched]);

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
    if (loadingMore) {
      const skip = friends.length;
      const limit = +process.env.REACT_APP_FRIENDS_PER_LOAD;
      fetchFriends({ skip, limit }).then(({ data }) => {
        if (data?.fetchFriends?.length) {
          setFriends([...friends, ...data.fetchFriends]);
          setLoadingMore(false);
        }
      });
    }
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
