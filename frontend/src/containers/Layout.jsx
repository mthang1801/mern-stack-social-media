import React, { useState, useCallback, createContext } from "react";
import Header from "../components/Header/Header";
import MenuList from "../components/Menu/MenuList";
import styled from "styled-components";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { GET_TOGGLE_BUTTON_MENU } from "../apollo/operations/queries/cache";
import useMenuList from "../components/Menu/useMenuList";
import { useThemeUI } from "theme-ui";
import AlertDialogSlide from "../components/UI/AlertDialogSlide";


const Layout = ({ children, className, ...props }) => {
  const getToggleButtonMenu = useQuery(GET_TOGGLE_BUTTON_MENU);
  const { toggleButtonMenu } = getToggleButtonMenu.data;
  const { menu, explores } = useMenuList();
  const { colorMode } = useThemeUI();
  return (
    <div className={className} theme={colorMode} {...props}>
      <AlertDialogSlide />
      <Header />
      <div
        className={classNames("small-viewport-menu-list", {
          "hide-small-viewport-list": toggleButtonMenu,
        })}
      >
        <MenuList list={menu} title="Menu" />
        <MenuList list={explores} title="Explores" />
      </div>
      <div className="body">{children}</div>
    </div>
  );
};

export default styled(Layout)`
  .small-viewport-menu-list {
    width: 100vw;
    position: fixed;
    height: calc(100vh - 60px);
    background-color: ${({ theme }) =>
      theme === "dark"
        ? "var(--color-background-dark)"
        : "var(--color-background-default)"};
    transition: var(--mainTransition);
    opacity: 1;
    overflow-x: hidden;
    z-index: 1000;
  }
  .hide-small-viewport-list {
    height: 0 !important;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  @media screen and (min-width: 992px) {
    .small-viewport-menu-list {
      display: none;
    }
  }
`;
