import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../containers/Layout';
import PostEditor from '../components/Post/PostEditor/PostEditor';
import HomeSidebar from '../components/Sidebar/HomeSidebar';
import MainBody from '../containers/MainBody';
import FriendsBoard from '../components/Sidebar/FriendsBoard';
import { useReactiveVar, useQuery } from '@apollo/client';
import ButtonToggleFriendsList from '../components/Controls/ButtonToggleFriendsList';
import {
  MainContent,
  MainContentLeftSide,
  MainContentRightSide,
} from './styles/pages.styles.js';
import Posts from '../components/Post/Posts';
import useHomePostsSubscription from '../hooks/useHomePostsSubscription';
import LazyLoad from 'react-lazyload';
import { userVar, toggleFriendsBoardVar, postsVar } from '../apollo/cache';
import { setToggleFriendsBoard } from '../apollo/controls/controls.caches';
import { FETCH_POSTS } from '../apollo/post/post.queries';
import { addFetchedPostToCache } from '../apollo/post/post.caches';
import { LIKE_POST_SUBSCRIPTION } from '../apollo/post/post.types';
import constant from '../constant/constant';
const Home = () => {
  const user = useReactiveVar(userVar);
  const toggleFriendsBoard = useReactiveVar(toggleFriendsBoardVar);
  const posts = useReactiveVar(postsVar);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState();
  const [fetchMore, setFetchMore] = useState(false);
  useHomePostsSubscription();
  const { refetch: fetchPosts, subscribeToMore: subcscribePosts } = useQuery(
    FETCH_POSTS,
    {
      fetchPolicy: 'no-cache',
      skip: true,
    }
  );
  useEffect(() => {
    if (!posts.length && user && !fetched) {
      setLoading(true);
      setFetched(true);
      fetchPosts().then(({ data }) => {
        if (data) {
          addFetchedPostToCache(data.fetchPosts);
        }
        setLoading(false);
      });
    }
  }, [user, posts, fetched]);

  useEffect(() => {
    let isScrolling;
    function onTrackUserScrolled(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const { clientHeight, scrollTop, scrollHeight } =
          document.documentElement;
        if (clientHeight + scrollTop > scrollHeight * 0.8) {
          setFetchMore(true);
        }
      }, 66);
    }
    window.addEventListener('scroll', onTrackUserScrolled);
    return () => {
      clearTimeout(isScrolling);
      window.removeEventListener('scroll', onTrackUserScrolled);
    };
  });

  console.log(posts);

  useEffect(() => {
    if (user && fetchMore) {
      const skip = posts.length;
      const limit = constant.REACT_APP_POSTS_PER_PAGE;
      fetchPosts({ skip, limit }).then(({ data: { fetchPosts } }) => {
        if (fetchPosts) {
          addFetchedPostToCache(fetchPosts);
        }
        setFetchMore(false);
      });
    }
  }, [user, posts, fetchMore, setFetchMore]);

  const handleOpenFriendsList = useCallback(() => {
    setToggleFriendsBoard();
  }, []);

  return (
    <Layout>
      <MainBody>
        <MainContent>
          <MainContentLeftSide>
            {user && (
              <LazyLoad once>
                <PostEditor />
              </LazyLoad>
            )}
            {loading && <div>Loading post</div>}
            {posts.length ? (
              <LazyLoad>
                <Posts posts={posts} />
              </LazyLoad>
            ) : null}
          </MainContentLeftSide>
          <MainContentRightSide>
            <HomeSidebar user={user} />
          </MainContentRightSide>
        </MainContent>
        {user && (
          <>
            {' '}
            {<FriendsBoard />}
            <ButtonToggleFriendsList
              hide={toggleFriendsBoard}
              onClick={handleOpenFriendsList}
            />
          </>
        )}
      </MainBody>
    </Layout>
  );
};

export default Home;
