import React, { useEffect, useState } from 'react';
import { Wrapper, LeftSide, RightSide } from './styles/PersonalPosts.styles';
import Posts from '../Post/Posts';
import PostEditor from '../Post/PostEditor/PostEditor';
import { useQuery, useReactiveVar } from '@apollo/client';
import { currentPersonalUserVar, userVar } from '../../apollo/cache';
import { FETCH_POSTS } from '../../apollo/post/post.queries';
import { addPostsToCurrentPersonalUser } from '../../apollo/post/post.caches';
import IntroductionBox from './IntroductionBox';
import constant from '../../constant/constant';

const PersonalPosts = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const user = useReactiveVar(userVar);
  const {
    data: fetchedPostsData,
    loading,
    fetchMore: fetchMorePostsData,
  } = useQuery(FETCH_POSTS, {
    variables: {
      userId: currentPersonalUser._id,
      skip: 0,
      limit: constant.REACT_APP_POSTS_PER_PAGE,
    },
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        addPostsToCurrentPersonalUser(data.fetchPosts);
      }
    },
  });

  useEffect(() => {
    let isScrolling;
    function trackUserScroll(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const { scrollHeight, scrollTop, clientHeight } =
          document.documentElement;
        if (
          scrollTop + clientHeight > 0.8 * scrollHeight &&
          currentPersonalUser.posts.length >
            currentPersonalUser.postsData?.length
        ) {
          setLoadingMore(true);
        }
      }, 66);
    }
    window.addEventListener('scroll', trackUserScroll);
    return () => {
      window.removeEventListener('scroll', trackUserScroll);
      if (isScrolling) {
        clearTimeout(isScrolling);
      }
    };
  });

  useEffect(() => {
    if (loadingMore && currentPersonalUser.postsData) {
      const skip = currentPersonalUser.postsData.length;
      const limit = constant.REACT_APP_POSTS_PER_PAGE;
      fetchMorePostsData({
        variables: {
          userId: currentPersonalUser._id,
          skip,
          limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            addPostsToCurrentPersonalUser(fetchMoreResult.fetchPosts);
          }
        },
      }).then(() => setLoadingMore(false));
    }
  }, [loadingMore, currentPersonalUser]);

  if (!fetchedPostsData) return null;
  if (loading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <LeftSide>
        <IntroductionBox />
      </LeftSide>
      <RightSide>
        {user?._id === currentPersonalUser?._id && <PostEditor />}
        {currentPersonalUser?.postsData?.length ? (
          <Posts posts={currentPersonalUser.postsData} />
        ) : null}
      </RightSide>
    </Wrapper>
  );
};

export default React.memo(PersonalPosts);
