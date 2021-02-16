import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Posts from "../components/Post/Posts";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FETCH_POSTS, GET_CURRENT_USER, GET_POSTS} from "../apollo/operations/queries";
import mutations from "../apollo/operations/mutations";
import BoxCreatePost from "../components/Post/BoxCreatePost/BoxCreatePost";
const Home = () => {
  const  { data: userData }= useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-only",
  });
  const [
    fetchPosts,
    { data: fetchedPosts, fetchMore },
  ] = useLazyQuery(FETCH_POSTS, { fetchPolicy: "cache-and-network" });  
  const {data : postsData} = useQuery(GET_POSTS)
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts } = mutations;

  useEffect(() => {    
    if (fetchedPosts && fetchedPosts.fetchPosts) {
      setPosts([...fetchedPosts.fetchPosts]);
    }
  }, [setPosts, fetchedPosts]);

  useEffect(() => {
    window.addEventListener("scroll", async (e) => {
      const docEl = document.documentElement;
      if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.8) {
        setLoadingMore(true);
      }
    });
  }, []);
  useEffect(() => {
    if (postsData && !postsData.posts.length) {
      fetchPosts();
    }
  }, [postsData, fetchPosts]);  
  useEffect(() => {
    if (loadingMore) {
      if (fetchMore) {
        fetchMore({
          query: FETCH_POSTS,
          variables: {
            skip: postsData.posts.length,
            limit: +process.env.REACT_APP_POSTS_PER_PAGE,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            setPosts([...prev.fetchPosts, ...fetchMoreResult.fetchPosts]);
            return {
              fetchPosts: [...prev.fetchPosts, ...fetchMoreResult.fetchPosts],
            };
          },
        }).then(() => setLoadingMore(false));
      } else {
        fetchPosts({
          variables: {
            skip: postsData.posts.length,
            limit: +process.env.REACT_APP_POSTS_PER_PAGE,
          },
        });
      }
    }
  }, [loadingMore, fetchMore]);
  
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
