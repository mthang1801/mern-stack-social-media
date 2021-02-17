import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Notifications from "../components/Notification/Notifications"
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER} from "../apollo/operations/queries"
import CardRequestAuth from "../components/Card/CardRequestAuth"
import mutations from "../apollo/operations/mutations"
const NotificationsPage = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER,{fetchPolicy : "cache-only"})
  const {setLoadingNotificationsMore} = mutations
  useEffect(()=>{
    window.addEventListener("scroll", e => {
      const {scrollHeight, scrollTop, clientHeight} = document.documentElement;      
      if(clientHeight + scrollTop > scrollHeight * 0.75){        
        setLoadingNotificationsMore(true)
      }
    })
    return () => {
      window.removeEventListener("scroll", () => {
        const {scrollHeight, scrollTop, clientHeight} = document.documentElement;      
        if(clientHeight + scrollTop > scrollHeight * 0.75){        
          setLoadingNotificationsMore(true)
        }
      })
    }
  },[])
  return (
    <Layout>
      <MainContent>
        <div className="notifications">
          {user ? <Notifications/> : <CardRequestAuth/>}
        </div>
        <div className="sidebar">
          
        </div>
      </MainContent>
    </Layout>
  );
};

const MainContent = styled.div`
  display: flex;
  margin: auto;
  padding: 1.5rem 0;
  .notifications {
    width: 100%;
  }
  .sidebar {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .notifications {
      width: calc(100% - 320px);
      padding: 0 1rem;
    }
    .sidebar {
      display: block;
      width: 320px;
      padding: 0 1rem;
    }
  }
  @media screen and (min-width: 992px) {
    padding: 0;
    .notifications {
      width: 50%;
    }
    .sidebar {
      width: 50%;
    }
  }
  @media screen and (min-width: 1920px) {
    .notifications {
      width: 55%;
    }
    .sidebar {
      width: 45%;
    }
  }
`;
export default NotificationsPage;
