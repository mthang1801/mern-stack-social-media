import React, {useEffect} from 'react'
import Layout from "../containers/Layout";
import styled from "styled-components";
import Posts from "../components/Post/Posts"
import {useLazyQuery} from "@apollo/client"
import {FETCH_POSTS, GET_CURRENT_USER} from "../apollo/operations/queries"
import mutations from "../apollo/operations/mutations"
import BoxCreatePost from "../components/Post/BoxCreatePost"
const Home = () => {
  const [getCurrentUser, {data : userData}] = useLazyQuery(GET_CURRENT_USER, {fetchPolicy : "cache-only"});
  const [fetchPosts, {data : postData}] = useLazyQuery(FETCH_POSTS);
  const {setPosts} = mutations
  useEffect(() => {
    let _isMounted = true ;
    if(_isMounted){   
      getCurrentUser() ;
      fetchPosts();            
    }
    return () => _isMounted = false ;
  }, [userData, fetchPosts, getCurrentUser])  
  useEffect(() => {        
    if(postData && postData.fetchPosts){
      setPosts([...postData.fetchPosts])      
    }
  },[postData, setPosts])    
  
  return (
    <Layout>
      <MainContent>
        <div className="posts">
          {userData && userData.user && <BoxCreatePost user={userData.user}/> }          
          <Posts/>
        </div>
        <div className="sidebar">          
        </div>
      </MainContent>    
    </Layout>
  )
}

const MainContent = styled.div`
  display : flex;  
  margin : auto;
  padding: 1.5rem 0;
  .posts{
    width : 100% ;
  }
  .sidebar {
    display : none ; 
  }
  @media screen and (min-width : 768px){
    .posts{      
      width : calc(100% - 320px);
      padding : 0 1rem;
    }
    .sidebar{      
      display : block;
      width : 320px;
      padding: 0 1rem;
    }
  }
  @media screen and (min-width : 992px){
    padding : 0;
    .posts{
      width : 60%;
    }
    .sidebar{
      width : 40%;
    }
  }
  @media screen and (min-width : 1920px){
    .posts{
      width : 65% ;       
    }
    .sidebar{
      width : 35% ;
    }
  }
`
export default React.memo(Home)
