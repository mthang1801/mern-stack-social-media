import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Posts from "../components/Post/Posts";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_POSTS,
} from "../apollo/operations/queries/cache";
import { FETCH_POSTS } from "../apollo/operations/queries/post";
import { cacheMutations } from "../apollo/operations/mutations";
import BoxCreatePost from "../components/Post/BoxCreatePost/BoxCreatePost";
import HomeSidebar from "../components/Sidebar/HomeSidebar";
import MainBody from "../components/Body/MainBody";

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
  const [loadingMore, setLoadingMore] = useState(false);
  const { setPosts } = cacheMutations;

  useEffect(() => {
    let _mounted = true;
    if (!posts.length) {
      fetchPosts().then(({ data: { fetchPosts } }) => {
        if (_mounted) {
          setPosts([...fetchPosts]);
        }
      });
    }
    if (loadingMore) {
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
  }, [posts, fetchPosts, setPosts, loadingMore]);

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

  return (
    <Layout>
      <MainBody>
        <MainContent>
          <div className="posts">
            {user && <BoxCreatePost user={user} />}
            {posts.length ? <Posts posts={posts} /> : null}
          </div>
          <div className="sidebar">
            <HomeSidebar user={user} />
          </div>
        </MainContent>
      </MainBody>
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
export default Home;
