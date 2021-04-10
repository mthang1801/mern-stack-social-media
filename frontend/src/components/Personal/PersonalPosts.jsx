import React, { useEffect, useState } from "react";
import { Wrapper, LeftSide, RightSide } from "./styles/PersonalPosts.styles";
import Posts from "../Post/Posts";
import PostEditor from "../Post/PostEditor/PostEditor";
import { useQuery } from "@apollo/client";
import { GET_PERSONAL_USER_CACHE_DATA } from "../../apollo/operations/queries/cache";
import { FETCH_POSTS } from "../../apollo/operations/queries/post";
import IntroductionBox from "./IntroductionBox";
import { cacheMutations } from "../../apollo/operations/mutations";
import LazyLoad from "react-lazyload";
import InfiniteScroll from "react-infinite-scroll-component";

const PersonalPosts = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const {
    data: { user, currentPersonalUser },
  } = useQuery(GET_PERSONAL_USER_CACHE_DATA, { fetchPolicy: "cache-first" });
  const {
    data: fetchedPostsData,
    loading,
    fetchMore: fetchMorePostsData,
  } = useQuery(FETCH_POSTS, {
    variables: {
      userId: currentPersonalUser._id,
      skip: 0,
      limit: +process.env.REACT_APP_POSTS_PER_PAGE,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data) {
        setPostsData((prevPosts) => [...prevPosts, ...data.fetchPosts]);
      }
    },
  });

  useEffect(() => {
    let isScrolling;
    function trackUserScroll(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = document.documentElement;
        if (
          scrollTop + clientHeight > 0.8 * scrollHeight &&
          currentPersonalUser.posts.length > postsData.length
        ) {
          setLoadingMore(true);
        }
      }, 66);
    }
    window.addEventListener("scroll", trackUserScroll);
    return () => {
      window.removeEventListener("scroll", trackUserScroll);
      if (isScrolling) {
        clearTimeout(isScrolling);
      }
    };
  });

  useEffect(() => {
    if (loadingMore) {
      const skip = postsData.length;
      const limit = +process.env.REACT_APP_POSTS_PER_PAGE;
      fetchMorePostsData({
        variables: {
          userId: currentPersonalUser._id,
          skip,
          limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            setPostsData((prevPosts) => [
              ...prevPosts,
              ...fetchMoreResult.fetchPosts,
            ]);
          }
        },
      }).then(() => setLoadingMore(false));
    }
  }, [loadingMore]);

  if (!fetchedPostsData) return null;
  if (loading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <LeftSide>
        <IntroductionBox />
      </LeftSide>
      <RightSide>
        {user?._id === currentPersonalUser?._id && <PostEditor user={user} />}
        {postsData.length && currentPersonalUser ? (
          <Posts posts={postsData} />
        ) : null}
      </RightSide>
    </Wrapper>
  );
};

export default React.memo(PersonalPosts);
