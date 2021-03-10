import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import Posts from "../components/Post/Posts";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_POSTS,
  GET_OPEN_FRIENDS_LIST,
  GET_FRIENDS,
} from "../apollo/operations/queries/cache";
import { FETCH_FRIENDS } from "../apollo/operations/queries/user";
import { FETCH_POSTS } from "../apollo/operations/queries/post";
import { cacheMutations } from "../apollo/operations/mutations";
import HomeSidebar from "../components/Sidebar/HomeSidebar";
import MainBody from "../components/Body/MainBody";
import FriendsComponent from "../components/Sidebar/FriendsComponent";
import ButtonToggleFriendsList from "../components/Controls/ButtonToggleFriendsList";
import {
  MainContent,
  MainContentLeftSide,
  MainContentRightSide,
} from "./styles/pages.styles.js";
const Home = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-first",
  });
  const {
    data: { posts },
  } = useQuery(GET_POSTS, { fetchPolicy: "cache-and-network" });
  const { refetch: fetchPosts } = useQuery(FETCH_POSTS, {
    skip: true,
    fetchPolicy: "cache-and-network",
  });
  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-first" });
  const { refetch: fetchFriends } = useQuery(FETCH_FRIENDS, {
    fetchPolicy: "network-only",
    skip: true,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts, setOpenFriendsList, setFriends } = cacheMutations;
  const {
    data: { openFriendsList },
  } = useQuery(GET_OPEN_FRIENDS_LIST, { fetchPolicy: "cache-first" });

  useEffect(() => {
    let _mounted = true;
    if (!posts.length && user) {
      fetchPosts().then(({ data: { fetchPosts } }) => {
        if (_mounted) {
          setPosts([...fetchPosts]);
        }
      });
    }
    if (user && loadingMore) {
      const skip = posts.length;
      const limit = +process.env.REACT_APP_POSTS_PER_PAGE;
      fetchPosts({ skip, limit }).then(({ data: { fetchPosts } }) => {
        if (_mounted) {
          setPosts([...posts, ...fetchPosts]);
          setLoadingMore(false);
        }
      });
    }
    return () => (_mounted = false);
  }, [posts, fetchPosts, setPosts, loadingMore, user]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const docEl = document.documentElement;
      if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {
        setLoadingMore(true);
      }
    });
    return () =>
      window.removeEventListener("scroll", (e) => {
        const docEl = document.documentElement;
        if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {
          setLoadingMore(true);
        }
      });
  }, []);

  const handleOpenFriendsList = async () => {
    if (friends.length < +process.env.REACT_APP_FRIENDS_PER_LOAD && user) {
      const skip = friends.length;
      const limit = +process.env.REACT_APP_FRIENDS_PER_LOAD;
      fetchFriends({ skip, limit }).then(({ data }) => {
        if (data?.fetchFriends) {
          setFriends([...friends, ...data.fetchFriends]);
          setOpenFriendsList();
        }
      });
    } else {
      setOpenFriendsList();
    }
  };
  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentLeftSide>          
            {posts.length ? <Posts posts={posts} /> : null}
          </MainContentLeftSide>
          <MainContentRightSide>
            <HomeSidebar user={user} />
          </MainContentRightSide>
        </MainContent>
        <FriendsComponent />
        <ButtonToggleFriendsList
          hide={openFriendsList}
          onClick={handleOpenFriendsList}
        />
      </MainBody>
    </Layout>
  );
};

export default Home;
