import React, { useEffect, useState } from 'react';
import PersonalHeading from '../components/Personal/PersonalHeading';
import { useQuery, useReactiveVar } from '@apollo/client';
import { currentPersonalUserVar } from '../apollo/cache';
import { FETCH_PERSONAL_USER } from '../apollo/user/user.types';
import Layout from '../containers/Layout';
import { setCurrentPersonalUser } from '../apollo/user/currentPersonalUser.caches';
import PersonalPosts from '../components/Personal/PersonalPosts';
const PersonalPage = (props) => {
  const { slug } = props.match.params;
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const { refetch: fetchCurrentPersonalUser } = useQuery(FETCH_PERSONAL_USER, {
    skip: true,
  });
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    let _mounted = true;
    fetchCurrentPersonalUser({ slug }).then(({ data }) => {
      if (data && _mounted) {
        setCurrentPersonalUser(data.fetchPersonalUser);
        setFetched(true);
      }
    });
    return () => (_mounted = false);
  }, [slug]);

  if (!currentPersonalUser || !fetched) return null;
  return (
    <Layout>
      <PersonalHeading />
      <PersonalPosts />
    </Layout>
  );
};

export default PersonalPage;
