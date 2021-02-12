import React from 'react'
import styled from "styled-components"
import Aside from "../Aside/Aside"
const Body = ({children}) => {
  return (
    <BodyWrapper>
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
  display : flex;  
  .aside{
    display : none ;     
  }
  .main-content{
    width : 100% ; 
  }

  @media screen and (min-width : 992px){
    .aside{
      display : fixed;
      width : 320px;
      height: calc(100vh - 60px);
      padding : 1rem 1.5rem;
    }
    .main-content{
      padding : 1.5rem 0;
      width : calc(100% - 320px);          
    }
  }
`

export default Body
