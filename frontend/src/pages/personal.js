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
  const { setCurrentPersonalUser } = cacheMutations;
  const { slug } = props.match.params; 

  const {data : postsData} = useQuery(FETCH_PERSONAL_USER, {fetchPolicy : "cache-and-network", variables : {slug}, onCompleted : (data) => {
    if(data?.fetchPersonalUser){
      setCurrentPersonalUser(data.fetchPersonalUser)
    }
  }})    
  if(!postsData) return null;
  return (
    <Layout>
      <PersonalHeading />
      <PersonalPosts/>
    </Layout>
  );
};

export default PersonalPage;
