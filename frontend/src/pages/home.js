import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Posts from "../components/Post/Posts";
import { useLazyQuery } from "@apollo/client";
import { FETCH_POSTS, GET_CURRENT_USER } from "../apollo/operations/queries";
import mutations from "../apollo/operations/mutations";
import BoxCreatePost from "../components/Post/BoxCreatePost/BoxCreatePost";
const Home = () => {
  const [getCurrentUser, { data: userData }] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-only",
  });
  const [
    fetchPosts,
    { data: postsData, loading, fetchMore },
  ] = useLazyQuery(FETCH_POSTS, { fetchPolicy: "cache-and-network" });  
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts } = mutations;
  useEffect(() => {
    let _isMounted = true;
    if (_isMounted) {
      getCurrentUser();
      fetchPosts();
    }
    return () => (_isMounted = false);
  }, [userData, fetchPosts, getCurrentUser]);

  useEffect(() => {
    if (postsData && postsData.fetchPosts) {
      setPosts([...postsData.fetchPosts]);
      if (fetchMore) {
        window.addEventListener("scroll", async (e) => {
          const docEl = document.documentElement;        
          if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {                       
            setLoadingMore(true);
          }
        });
      }
    }
  }, [postsData, setPosts]);

  useEffect(()=>{
    if(loadingMore){
      fetchMore({
        query: FETCH_POSTS,
        variables: {
          skip: postsData.fetchPosts.length,
          limit: +process.env.REACT_APP_POSTS_PER_PAGE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {          
          setPosts([...prev.fetchPosts, ...fetchMoreResult.fetchPosts]);
          return {
            fetchPosts: [
              ...prev.fetchPosts,
              ...fetchMoreResult.fetchPosts,
            ],
          };
        },
      }).then(() => setLoadingMore(false));
    }
  },[loadingMore])
  return (
    <Layout>
      <MainContent>
        <div className="posts">
          {userData && userData.user && <BoxCreatePost user={userData.user} />}
          <Posts />
        </div>
        <div className="sidebar"></div>
      </MainContent>
    </Layout>
  );
};

const MainContent = styled.div`
  display: flex;
  margin: auto;
  padding: 1.5rem 0;
  .posts {
    width: 100%;
  }
  .sidebar {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .posts {
      width: calc(100% - 320px);
      padding: 0 1rem;
    }
    .sidebar {
      display: block;
      width: 320px;
      padding: 0 1rem;
    }
  }
  @media screen and (min-width: 992px) {
    padding: 0;
    .posts {
      width: 60%;
    }
    .sidebar {
      width: 40%;
    }
  }
  @media screen and (min-width: 1920px) {
    .posts {
      width: 65%;
    }
    .sidebar {
      width: 35%;
    }
  }
`;
export default React.memo(Home);
