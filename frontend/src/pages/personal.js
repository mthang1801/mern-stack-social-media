import React, { useEffect, lazy } from "react";
import PersonalHeading from "../components/Personal/PersonalHeading";
import { Route, Switch } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_PERSONAL_USERS,
  FETCH_PERSONAL_USER,
  GET_PERSONAL_POSTS,
  GET_CURRENT_PERSONAL_USER,
} from "../apollo/operations/queries";
import Layout from "../containers/Layout";
import mutations from "../apollo/operations/mutations";

const PersonalPosts = lazy(() => import("./personal-posts"));
const PersonalPage = (props) => {
  const [
    fetchPersonalUser,
    { data: personalUserData },
  ] = useLazyQuery(FETCH_PERSONAL_USER, { fetchPolicy: "cache-and-network" });
  const {
    data: { personalUsers },
  } = useQuery(GET_PERSONAL_USERS, { fetchPolicy: "cache-first" });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { personalPosts },
  } = useQuery(GET_PERSONAL_POSTS, { fetchPolicy: "cache-first" });
  const {
    setPersonalUsers,
    setCurrentPersonalUser,
    setPersonalPosts,
  } = mutations;
  const { slug } = props.match.params;
  useEffect(() => {
    let _mounted = true;
    if (_mounted) {
      //require fetch personal user because we need to set who is current personal user
      fetchPersonalUser({ variables: { slug } });
    }
    return () => (_mounted = false);
  }, [personalUsers, fetchPersonalUser, slug, currentPersonalUser]);
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
      setPersonalUsers({
        ...personalUsers,
        [slug]: { ...personalUserData.fetchPersonalUser },
      });

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
      <Switch>
        <Route exact path={props.match.url} component={PersonalPosts} />
        <Route path={`${props.match.url}/posts`} component={PersonalPosts} />
      </Switch>
    </Layout>
  );
};

export default PersonalPage;
