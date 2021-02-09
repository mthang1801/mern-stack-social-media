import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Brand from "./Brand";
import Search from "./Search";
import Navigation from "./Navigation";
import MessengerAndNotification from "./MessengerAndNotification";
import SettingAccount from "./SettingAccount";
import Button from "../Controls/ButtonDefault";
import { FaArrowLeft } from "react-icons/fa";
import ButtonMenu from "../Controls/ButtonMenu";
import mutations from "../../apollo/operations/mutations";
import classNames from "classnames";
import { GET_CURRENT_USER } from "../../apollo/operations/queries";
import { useLazyQuery } from "@apollo/client";
import {useLocation, useHistory} from "react-router-dom"
import {useThemeUI} from "theme-ui"
const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [getCurrentUser, {data, loading}] = useLazyQuery(GET_CURRENT_USER, {fetchPolicy : "cache-only"});
  const [currentUser, setCurrentUser] = useState(null)
  const {colorMode} = useThemeUI()
  
  useEffect(() => {
    let _isMounted = true ;
    if(_isMounted){
      getCurrentUser();
    }
    return () => _isMounted = false ;
  }, [getCurrentUser])
  useEffect(() => {        
    if(data && data.user){
      setCurrentUser({...data.user})
    }else{
      setCurrentUser(null)
    }
  },[data])
  
  const location = useLocation();  
  const history = useHistory()
  const { toggleButtonMenu } = mutations;     
  const directToLogin = () => {
    history.push({pathname : "/auth", state : {from : location.pathname}})
  }
  const directToSignUp = () => {
    history.push({pathname : "/auth/signup", state : {from : location.pathname}})
  }
  const NavControls = currentUser ? (
    <div className="nav-controls">
      <div className="center">
        <div className="nav-toggle">
          <ButtonMenu onClick={toggleButtonMenu} />
        </div>
        <div className="nav-bar">
          <Navigation />
        </div>

        <div className="control">
          <MessengerAndNotification />
        </div>
      </div>
      <div className="setting-account">
        <SettingAccount currentUser={currentUser}/>
      </div>
    </div>
  ) : (
    <div className="nav-controls">
      <div className="nav-auth">
        <button className="btn btn-login" onClick={directToLogin}>Login</button>
        <button className="btn btn-signup" onClick={directToSignUp}>Sign up</button>
        <div className="setting-account">
        <SettingAccount />
      </div>
      </div>
    </div>
  );
  if(loading) return <div>Loading...</div>
  return (
    <Wrapper theme={colorMode}>
      <div className={classNames("nav-header", { shorten: !openSearch })}>
        <div className={classNames("nav-brand", { hide: openSearch })}>
          <Brand />
        </div>
        <div
          className={classNames(
            "close-search",
            { "on-search-open": !openSearch },
            { hide: !openSearch }
          )}
        >
          <Button onClick={() => setOpenSearch(false)} variant="outlined">
            <FaArrowLeft />
          </Button>
        </div>
        <div className={classNames("search-bar")}>
          <Search
            openSearch={openSearch}
            setOpenSearch={() => setOpenSearch(true)}
          />
        </div>
      </div>
      {NavControls}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100vw;
  height: 60px;
  background-color: ${({theme}) => theme=== "dark" ? "var(--color-background-dark)" : "var(--color-background-default)"  };
  border-bottom : 1px solid ${({theme}) => theme==="dark" ? "var(--gray)" : "var(--gray-light)"};
  
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  .btn{
    border-radius : 1.5rem;
    padding : 0.75rem 1.5rem;
    outline : none ; 
    border : none ; 
    cursor : pointer;
    transition : var(--mainTransition);
    text-transform : uppercase ;
    font-weight : bolder;
    &:not(:last-child){
      margin-right : 1rem;
    }
    &-login{
      border : 1px solid var(--primary);
      color : var(--primary);      
      &:hover{
        color : var(--light);
        background-color : var(--primary);
        box-shadow : var(--lightShadow);
      }
    }
    &-signup{
      border : 1px solid var(--success);
      color : var(--success);      
      &:hover{
        color : var(--light);
        background-color : var(--success);
        box-shadow : var(--lightShadow);
      }
    }
  }
  .nav-header {
    display: flex;
    align-items: center;
    transition: var(--mainTransition);
    flex-wrap: nowrap;
    .nav-brand,
    .on-search-open {
      width: 60px;
      transition: var(--mainTransition);
    }
    .search-bar {
      width: calc(100% - 60px);
      transition: var(--mainTransition);
    }
    .nav-brand {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .nav-controls {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--mainTransition);
    height: 100%;
    .nav-bar {
      display: none;
    }
    .center {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: 0 0.5rem;
    }
    .nav-toggle {
      margin-right: 0.75rem;
    }
    .nav-auth{
      width : 100%;
      display : flex;
      justify-content : flex-end;
    }
  }

  @media screen and (max-width: 768px) {
    .hide {
      width: 0 !important;
      opacity: 0;
      visibility: hidden;
      transition: var(--mainTransition);
      transition-delay: 0.5s;
    }
    .shorten {
      width: auto !important;
      transition: var(--mainTransition);
    }
  }
  @media screen and (min-width: 768px) {
    padding: 0 2rem;
    .close-search {
      display: none;
    }
    .nav-header {
      width: 40%;
    }
    .nav-controls {
      width: 60%;
      .nav-bar {
        display: block;
        height: 100%;
      }
      .center {
        justify-content: flex-end;
      }
      .control {
        padding: 0 0.5rem;
      }
    }
  }
  @media screen and (min-width: 992px) {
    .nav-header {
      width: 35%;
    }
    .nav-controls {
      width: 65%;
      .nav-toggle {
        display: none;
      }
    }
  }
`;

export default Header;
