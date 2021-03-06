import React, { useEffect, lazy } from "react";
import PersonalHeading from "../components/Personal/PersonalHeading";
import { useLazyQuery, useQuery } from "@apollo/client";
import {  
  GET_PERSONAL_POSTS,
  GET_CURRENT_PERSONAL_USER,
} from "../apollo/operations/queries/cache";
import { FETCH_PERSONAL_USER } from "../apollo/operations/queries/user";
import Layout from "../containers/Layout";
import { cacheMutations } from "../apollo/operations/mutations";
import PersonalPosts from "../components/Personal/PersonalPosts"

const PersonalPage = (props) => {
  const [
    fetchPersonalUser,
    { data: personalUserData },
  ] = useLazyQuery(FETCH_PERSONAL_USER, { fetchPolicy: "cache-and-network" });  
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { personalPosts },
  } = useQuery(GET_PERSONAL_POSTS, { fetchPolicy: "cache-first" });
  const {    
    setCurrentPersonalUser,
    setPersonalPosts,
  } = cacheMutations;
  const { slug } = props.match.params;
  useEffect(() => {
    let _mounted = true;
    if (_mounted) {
      //require fetch personal user because we need to set who is current personal user
      fetchPersonalUser({ variables: { slug } });
    }
    return () => (_mounted = false);
  }, [fetchPersonalUser, slug, currentPersonalUser]);
  useEffect(() => {
    if (personalUserData && personalUserData.fetchPersonalUser) {
      let {
        _id,
        name,
        email,
        avatar,
        posts,
        slug,
      } = personalUserData.fetchPersonalUser;    

      setCurrentPersonalUser({ ...personalUserData.fetchPersonalUser });
      posts = posts.map((post) => {
        const author = {
          _id,
          name,
          avatar,
          email,
          slug,
        };
        return { ...post, author: { ...author } };
      });
      setPersonalPosts({ ...personalPosts, [slug]: [...posts] });
    }
  }, [personalUserData]);

  return (
    <Layout>
      <PersonalHeading />
      <PersonalPosts/>      
    </Layout>
  );
};

export default PersonalPage;
