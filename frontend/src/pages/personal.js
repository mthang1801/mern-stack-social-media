import React, { useEffect } from "react";
import PersonalHeading from "../components/Personal/PersonalHeading";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_PERSONAL_USER,
} from "../apollo/operations/queries/cache";
import { FETCH_PERSONAL_USER } from "../apollo/operations/queries/user";
import Layout from "../containers/Layout";
import { cacheMutations } from "../apollo/operations/mutations";
import PersonalPosts from "../components/Personal/PersonalPosts";

const PersonalPage = (props) => {
  const { refetch: fetchPersonalUser } = useQuery(FETCH_PERSONAL_USER, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });

  const { setCurrentPersonalUser, setPersonalPosts } = cacheMutations;
  const { slug } = props.match.params;
  useEffect(() => {
    let _mounted = true;
    if (_mounted) {
      //require fetch personal user because we need to set who is current personal user
      fetchPersonalUser({ slug })
        .then(({ data }) => {
          if (data) {
            const { fetchPersonalUser } = data;
            setCurrentPersonalUser(fetchPersonalUser);
          }
        })
        .catch((err) => console.log(err));
    }
    return () => (_mounted = false);
  }, [fetchPersonalUser, slug, currentPersonalUser]);    
  return (
    <Layout>
      <PersonalHeading />
      <PersonalPosts/>
    </Layout>
  );
};

export default PersonalPage;
