import React from 'react'
import Header from "../components/Header/Header";
import MobileMenuList from "../components/Global/MobileMenuList"
import styled from "styled-components"
import classNames from "classnames"
import {useQuery} from "@apollo/client"
import {GET_TOGGLE_BUTTON_MENU_MOBILE} from "../apollo/operations/queries"
const Layout = ({children, className}) => {
  const getToggleButtonMenuMobile = useQuery(GET_TOGGLE_BUTTON_MENU_MOBILE); 
  const {toggleButtonMenuMobile} = getToggleButtonMenuMobile.data
  
  return (
    <div className={className}>
      <Header/>
      <div className={classNames("mobile-menu-list", {"hide-mobile-list" : toggleButtonMenuMobile})}>
        <MobileMenuList/>  
      </div>      
      <div>
      {children}
      </div>      
    </div>
  )
}

export default styled(Layout)`
  .mobile-menu-list{
    width : 100vw; 
    height: calc(100vh - 60px);    
    transition : var(--mainTransition);
    opacity : 1 ;
    z-index : 1000;    
  }
  .hide-mobile-list{    
    height:  0 !important; 
    visibility : hidden ; 
    opacity : 0; 
    z-index: -1; 
  }
  @media screen and (min-width : 992px){
    .mobile-menu-list{
      display : none ; 
    }
  }
`
