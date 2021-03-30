import React, { useEffect, useState, useCallback , lazy, Suspense} from "react";
import Layout from "../containers/Layout";
import PostEditor from "../components/Post/PostEditor/PostEditor";
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
const Posts = lazy(() => import("../components/Post/Posts"));
const Home = () => {
  const {
    data: { user, openFriendsList, posts },
  } = useQuery(GET_HOME_CACHE_DATA, { fetchPolicy: "cache-and-network" });
  const { refetch: fetchPosts } = useQuery(FETCH_POSTS, {
    skip: true,
    fetchPolicy: "cache-and-network",
  });
  
  const [fetched, setFetched] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts, setOpenFriendsList, setNewPost } = cacheMutations;
  useEffect(() => {
    let _mounted = true;
    if (!posts.length && user && !fetched) {
      fetchPosts().then(({ data: { fetchPosts } }) => {
        if (_mounted && fetchPosts) {
          setPosts([...fetchPosts]);
          setFetched(true);
        }
      });
    }
    return () => (_mounted = false);
  }, [user, posts, fetched]);

  useEffect(() => {
    let _mounted = true;
    if (user && loadingMore) {
      const skip = posts.length;
      const limit = +process.env.REACT_APP_POSTS_PER_PAGE;
      fetchPosts({ skip, limit }).then(({ data: { fetchPosts } }) => {
        if (_mounted) {
          console.log(fetchPosts);
          if (fetchPosts) {
            setPosts([...posts, ...fetchPosts]);
          }
          setLoadingMore(false);
        }
      });
    }
    return () => (_mounted = false);
  }, [posts, fetchPosts, setPosts, loadingMore, user]);

  useEffect(() => {
    let isScrolling;
    function onTrackUserScrolled(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const {
          clientHeight,
          scrollTop,
          scrollHeight,
        } = document.documentElement;
        if (clientHeight + scrollTop > scrollHeight * 0.8) {
          setLoadingMore(true);
        }
      }, 66);
    }
    window.addEventListener("scroll", onTrackUserScrolled);
    return () => {
      clearTimeout(isScrolling);
      window.removeEventListener("scroll", onTrackUserScrolled);
    };
  });
  const handleOpenFriendsList = useCallback(() => {
    setOpenFriendsList();
  }, []);  
  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentLeftSide>
            {user && <PostEditor user={user} />}
            <Suspense fallback={<div>Loading posts...</div>}>
            {posts.length ? <Posts posts={posts} /> : null}
            </Suspense>
          </MainContentLeftSide>
          <MainContentRightSide>
            <HomeSidebar user={user} />
          </MainContentRightSide>
        </MainContent>
        {user && (
          <>
            {" "}
            <FriendsBoard />
            <ButtonToggleFriendsList
              hide={openFriendsList}
              onClick={handleOpenFriendsList}
            />
          </>
        )}
      </MainBody>
    </Layout>
  );
};

export default Home;
