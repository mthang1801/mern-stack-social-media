import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Brand from "./Brand";
import Search from "./Search";
import Navigation from "./Navigation";
import MessengerAndNotification from "./MessengerAndNotification";
import SettingAccount from "./SettingAccount";
import Button from "../Controls/ButtonDefaultCircle";
import { FaArrowLeft } from "react-icons/fa";
import ButtonMenu from "../Controls/ButtonMenu";
import {toggleMenu} from "../../apollo/controls/controls.actions"

import classNames from "classnames";
import { userVar } from "../../apollo//cache";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import ButtonLogin from "../Controls/ButtonLogin";
import ButtonSignUp from "../Controls/ButtonSignUp";
const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
 const user = useReactiveVar(userVar);
  const { colorMode } = useThemeUI();
  const { pathname } = useLocation();
  
  const NavControls = user ? (
    <div className="nav-controls">
      <div className="center">
        <div className="nav-toggle">
          <ButtonMenu onClick={toggleMenu} />
        </div>
        <div className="nav-bar">
          <Navigation />
        </div>

        <div className="control">
          <MessengerAndNotification />
        </div>
      </div>
      <div className="setting-account">
        <SettingAccount />
      </div>
    </div>
  ) : (
    <div className="nav-controls">
      <div className="nav-auth">
        <ButtonLogin to="/auth" from={pathname}>
          Login
        </ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>
          Sign up
        </ButtonSignUp>
        <div className="setting-account">
          <SettingAccount />
        </div>
      </div>
    </div>
  );
 
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
  background-color: ${({ theme }) =>
    theme === "dark"
      ? "var(--color-background-dark)"
      : "var(--color-background-default)"};
  border-bottom: 1px solid
    ${({ theme }) => (theme === "dark" ? "var(--gray)" : "var(--gray-light)")};
  position: fixed;
  top: 0;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  z-index: 100;
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
    padding: 0 1.5rem;
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
    .nav-auth {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      & > * {
        font-size: 0.8em;
        margin-right: 0.25rem;
      }
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
      width: 30%;
    }
    .nav-controls {
      width: 70%;
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

export default React.memo(Header);
