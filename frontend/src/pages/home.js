import React from 'react'
import Layout from "../containers/Layout";
import styled from "styled-components";
import PostToolbar from "../components/Body/PostToolbar";
const Home = () => {
  return (
    <Layout>
      <MainContent>
        <div className="posts">
          <PostToolbar/>
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
export default Home
