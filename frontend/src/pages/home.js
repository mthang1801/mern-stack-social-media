import React, {useEffect} from 'react'
import Layout from "../containers/Layout";
import styled from "styled-components";
import PostToolbar from "../components/Post/PostToolbar";
import Posts from "../components/Post/Posts"
import {useLazyQuery} from "@apollo/client"
import {FETCH_POSTS, GET_CURRENT_USER} from "../apollo/operations/queries"
import mutations from "../apollo/operations/mutations"
const Home = () => {
  const [getCurrentUser, {data : userData, loading: userLoading}] = useLazyQuery(GET_CURRENT_USER, {fetchPolicy : "cache-only"});
  const [fetchPosts, {data : postData, loading: postsLoading}] = useLazyQuery(FETCH_POSTS);
  const {setPosts} = mutations
  useEffect(() => {
    let _isMounted = true ;
    if(_isMounted){   
      getCurrentUser() ;
      fetchPosts({pollInterval : 500});            
    }
    return () => _isMounted = false ;
  }, [userData])  
  useEffect(() => {        
    if(postData && postData.fetchPosts){
      setPosts([...postData.fetchPosts])      
    }
  },[postData])    
  return (
    <Layout>
      <MainContent>
        <div className="posts">
          <PostToolbar/>
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
  width : 90% ;
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
    }
    .sidebar{      
      display : block;
      width : 320px;
    }
  }
  @media screen and (min-width : 992px){
    padding : 0;
    .posts{
      width : 65%;
    }
    .sidebar{
      width : 35%;
    }
  }
  @media screen and (min-width : 1920px){
    .posts{
      width : 70% ;       
    }
    .sidebar{
      width : 30% ;
    }
  }
`
export default React.memo(Home)
