import React , {useState, useEffect } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useThemeUI} from "theme-ui"
const MobileMenuList = ({aside, title, list}) => {  
  const {colorMode} = useThemeUI()
  if(!list || !list.length || !title) return null
  return (
    <Wrapper aside={!!aside} theme={colorMode}>
      <h5 className="menu-title">{title}</h5>
      <ul>
        {list.map(item => (
          <li key={item.name}>
            <Link to={item.path} className={"link-item"}>
              <span className="link-icon">{item.icon()}</span>
              <span className="link-name">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  background-color : ${({theme}) => theme==="default" ? "var(--color-background-default)" : "var(--color-background-dark)"};
  color : ${({theme}) => theme==="default" ? "var(--color-text-default)" : "var(--color-text-dark)"};
  .menu-title{
    padding : 0.5rem 1.6rem;
    font-size : var(--fontSize-1);
    opacity : 0.5;
  }
  ul{
    list-style:  none ; 
  }
  .link-item{
    display : flex;    
    margin : 0 1rem;
    justify-content : flex-start;
    align-items :center;  
    padding : ${({aside}) => aside ? "0.25rem 0.6rem" : "0.6rem"};  
    transition : var(--mainTransition);
    &:hover{
      background-color : var(--gray-deep);
      border-radius : 4px;      
    }        
  }
  .link-icon{
    font-size : 1.5rem;
    display : flex;
    margin-right : 1rem;
  }
`

export default MobileMenuList
