import React, { useEffect, useState, useCallback } from "react";
import Layout from "../containers/Layout";
import PostEditor from "../components/Post/PostEditor/PostEditor"
import Posts from "../components/Post/Posts";
import { useQuery } from "@apollo/client";
import { GET_HOME_CACHE_DATA } from "../apollo/operations/queries/cache";
import { FETCH_POSTS } from "../apollo/operations/queries/post";
import { cacheMutations } from "../apollo/operations/mutations";
import HomeSidebar from "../components/Sidebar/HomeSidebar";
import MainBody from "../components/Body/MainBody";
import FriendsBoard from "../components/Sidebar/FriendsBoard";
import ButtonToggleFriendsList from "../components/Controls/ButtonToggleFriendsList";
import {
  MainContent,
  MainContentLeftSide,
  MainContentRightSide,
} from "./styles/pages.styles.js";
const Home = () => {
  const {
    data: { user, openFriendsList, posts },
  } = useQuery(GET_HOME_CACHE_DATA, { fetchPolicy: "cache-and-network" });
  // const { refetch: fetchPosts } = useQuery(FETCH_POSTS, {
  //   skip: true,
  //   fetchPolicy: "cache-and-network",
  // });
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts, setOpenFriendsList } = cacheMutations;
  // useEffect(() => {
  //   let _mounted = true;
  //   if (!posts.length && user) {      
  //     fetchPosts().then(({ data: { fetchPosts } }) => {
  //       if (_mounted) {
  //         setPosts([...fetchPosts]);
  //       }
  //     });
  //   }
  //   if (user && loadingMore) {
  //     const skip = posts.length;
  //     const limit = +process.env.REACT_APP_POSTS_PER_PAGE;      
  //     fetchPosts({ skip, limit }).then(({ data: { fetchPosts } }) => {
  //       if (_mounted) {
  //         setPosts([...posts, ...fetchPosts]);
  //         setLoadingMore(false);
  //       }
  //     });
  //   }
  //   return () => (_mounted = false);
  // }, [posts, fetchPosts, setPosts, loadingMore, user]);
  
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
  const handleOpenFriendsList = useCallback(() => {
    setOpenFriendsList();
  },[]);
  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentLeftSide>
            {user && <PostEditor user={user} current/>}
            {posts.length ? <Posts posts={posts} /> : null}
          </MainContentLeftSide>
          <MainContentRightSide>
            <HomeSidebar user={user} />
          </MainContentRightSide>
        </MainContent>
        <FriendsBoard />
        <ButtonToggleFriendsList
          hide={openFriendsList}
          onClick={handleOpenFriendsList}
        />
      </MainBody>
    </Layout>
  );
};

export default Home;
