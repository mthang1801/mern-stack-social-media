import React from 'react'
import styled from "styled-components"
import Aside from "../Aside/Aside"
import {useThemeUI} from "theme-ui"
// This body used for home, notifications and global page
const MainBody = ({children}) => {
  const {colorMode} = useThemeUI()
  return (
    <BodyWrapper theme={colorMode}>
      <aside className="aside">
        <Aside/>
      </aside>
      <div className="main-content">
        {children}
      </div>
    </BodyWrapper>
  )
}

const BodyWrapper = styled.div`  
  margin-top: 60px;  
  width : 100% ; 
  padding : 0 0.4rem;

  .aside{
    display : none ;     
  }
  .main-content{
    width : 100% ; 
  }

  @media screen and (min-width : 992px){
    padding :0 1rem;
    .aside{
      display : -webkit-box;
      position: fixed;
      width : 320px;
      height: calc(100vh - 60px);
      padding : 1rem 1.5rem;      
    }
    .main-content{
      margin-left : 320px;
      padding : 1.5rem 0;
      width : calc(100% - 320px);          
    }
  }
`

export default MainBody