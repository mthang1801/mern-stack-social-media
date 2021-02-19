import React, {useState, useEffect, useContext, lazy} from 'react'
import PersonalHeading from "../components/Personal/PersonalHeading"
import {Route, Switch} from "react-router-dom"
import {useLazyQuery, useQuery} from "@apollo/client"
import {GET_CURRENT_USER, FETCH_CURRENT_USER, GET_PERSONAL_USERS} from "../apollo/operations/queries"
import Layout from "../containers/Layout"
import mutations from '../apollo/operations/mutations'

const PersonalPosts =  lazy(() => import("./personal-posts"))
const PersonalPage = (props) => { 
  const [fetchPersonalUser , {data : personalUserData}] = useLazyQuery(FETCH_CURRENT_USER, {fetchPolicy : "cache-and-network"}); 
  const {data: {personalUsers}} = useQuery(GET_PERSONAL_USERS, {fetchPolicy : "cache-first"}); 
  const {setPersonalUsers, setCurrentPersonalUser} = mutations
  useEffect(() => {
    const {slug} = props.match.params;
    if(personalUsers && !personalUsers[slug]){
      fetchPersonalUser({variables : {slug}})
    }  
    if(personalUsers && personalUsers[slug]){
      setCurrentPersonalUser(personalUsers[slug])
    }
  },[personalUsers])
  useEffect(() => {
    if(personalUserData && personalUserData.fetchCurrentUser){
      setPersonalUsers(personalUserData.fetchCurrentUser)
    }
  },[personalUserData])
  
  return (
    <Layout>
      <PersonalHeading/>
      <Switch>
        <Route exact path={props.match.url} render={(props) => <PersonalPosts {...props} />}/>
        <Route path={`${props.match.url}/posts`} render={(props) => <PersonalPosts {...props} />}/>
      </Switch>
    </Layout>
  )
}

export default PersonalPage
