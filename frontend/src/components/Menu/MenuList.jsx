import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useThemeUI} from "theme-ui"
import {useQuery} from "@apollo/client"
import {GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN} from "../../apollo/operations/queries/cache"
const MobileMenuList = ({aside, title, list}) => {  
  const {colorMode} = useThemeUI()
  const {data: {countNumberNotificationsUnseen}} = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {fetchPolicy : "cache-first"})
  if(!list || !list.length || !title) return null  
  return (
    <Wrapper aside={!!aside} theme={colorMode}>
      <h5 className="menu-title">{title}</h5>
      <ul>
        {list.map(item => (
          <li key={item.name}>
            <Link to={item.path} className={"link-item"}>
              <div className="link-item__left">
                <span className="link-icon">{item.icon()}</span>
                <span className="link-name">{item.name}</span>
              </div>
              <div className="link-item__right">
                {countNumberNotificationsUnseen && item.name === "Notifications" && <span>{countNumberNotificationsUnseen}</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  
  color : ${({theme}) => theme=== "dark" ? "var(--color-text-dark)" : "var(--color-text-default)" };  
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
    padding : ${({aside}) => aside ? "0.25rem 0.6rem" : "0.5rem 2rem"};      
    transition : var(--mainTransition);
    border : 1px solid transparent ;
    &:hover{
      border : 1px solid var(--gray-light);
      border-radius : 4px;      
    }        
    &__left{
      display : flex;
      flex:  1;
    }
    &__right{            
      & > span{
        display : inline-block;
        border : 1px solid var(--red);
        padding: 0.075rem 0.3rem;
        border-radius : 0.25rem;
        background-color : var(--red);
        color : var(--white);
        font-weight : bolder;
        font-size : 0.9em;
      }
    }
  }
  .link-icon{
    font-size : 1.5rem;
    display : flex;
    margin-right : 1rem;
  }
`

export default MobileMenuList
