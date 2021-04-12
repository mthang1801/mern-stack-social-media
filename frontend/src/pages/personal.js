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
  const {data : {currentPersonalUser}} = useQuery(GET_CURRENT_PERSONAL_USER)
  const {refetch : fetchCurrentPersonalUser} = useQuery(FETCH_PERSONAL_USER, {skip : true})  

  useEffect(() => {
    let _mounted = true ;
    fetchCurrentPersonalUser({slug}).then(({data}) => {
      if(data && _mounted){
        setCurrentPersonalUser(data.fetchPersonalUser);
      }
    })
    return () => _mounted = false ;
  },[slug])
  
  if(!currentPersonalUser || currentPersonalUser.slug !== slug) return null;
  return (
    <Layout>
      <PersonalHeading />
      <PersonalPosts/>
    </Layout>
  );
};

export default PersonalPage;
