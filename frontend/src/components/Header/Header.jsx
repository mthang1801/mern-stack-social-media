import React, { useState } from "react";
import styled from "styled-components";
import Brand from "./Brand";
import Search from "./Search";
import Navigation from "./Navigation";
import MessengerAndNotification from "./MessengerAndNotification";
import SettingAccount from "./SettingAccount";
import Button from "../Controls/ButtonHeader";
import { FaArrowLeft } from "react-icons/fa";
import ButtonMenu from "../Controls/ButtonMenu"
import {mutations} from "../../apollo/operations/mutations"
import classNames from "classnames";
const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const {toggleButtonMenuMobile} = mutations
  return (
    <Wrapper>
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
      <div className="nav-controls">
        <div className="center">
          <div className="nav-bar">
            <Navigation />
          </div>
          <div className="nav-toggle">
            <ButtonMenu onClick={toggleButtonMenuMobile}/>
          </div>          
          <div className="control">
            <MessengerAndNotification />
          </div>
        </div>
        <div className="setting-account">
          <SettingAccount />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100vw;
  height: 60px;
  background-color: var(--gray-light);
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  overflow: hidden;

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
    flex : 1 ;    
    display : flex;    
    justify-content : space-between;
    align-items: center;    
    transition : var(--mainTransition);
    .nav-bar {
      display: none;
    }    
    .center{
      display : flex;
      align-items: center;
      justify-content : space-between;
      flex: 1 ;           
      padding : 0 0.5rem;
    }          
    .nav-toggle{
      margin-right : 0.75rem;
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
    .nav-controls {
      .nav-bar {
        display: block;                           
      }
      .nav-toggle{
        display : none;        
      }
      .center{
        justify-content: flex-end ;
      }
      .control{
        padding : 0 0.5rem;
      }
    }
    
  }
`;

export default Header;
