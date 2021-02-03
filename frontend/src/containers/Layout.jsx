import React from 'react'
import Header from "../components/Header/Header";
import MenuList from "../components/Menu/MenuList"
import Body from "../components/Body/Body"
import styled from "styled-components"
import classNames from "classnames"
import {useQuery} from "@apollo/client"
import {GET_TOGGLE_BUTTON_MENU_MOBILE} from "../apollo/operations/queries"
import useMenuList from "../components/Menu/useMenuList"
const Layout = ({children, className}) => {
  const getToggleButtonMenuMobile = useQuery(GET_TOGGLE_BUTTON_MENU_MOBILE); 
  const {toggleButtonMenuMobile} = getToggleButtonMenuMobile.data;
  const {menu, namePage, explores} = useMenuList()
  
  return (
    <div className={className}>
      <Header/>
      <div className={classNames("mobile-menu-list", {"hide-mobile-list" : toggleButtonMenuMobile})}>
        <MenuList  list={menu} title="Menu"/>  
        <MenuList list={explores} title="Explores"/>
      </div>      
      <Body>{children}</Body>
    </div>
  )
}

export default styled(Layout)`

  .mobile-menu-list{
    width : 100vw; 
    position : fixed;
    height: calc(100vh - 60px);    
    transition : var(--mainTransition);
    opacity : 1 ;
    overflow-x : hidden;
    z-index : 1000;    
  }
  .hide-mobile-list{    
    height:  0 !important; 
    visibility : hidden ; 
    opacity : 0; 
    z-index: -1; 
  }
  @media screen and (min-width : 768px){
    .mobile-menu-list{
      display : none ; 
    }
  }
`
