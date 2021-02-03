import React , {useState, useEffect } from 'react'
import styled from "styled-components";
import useLanguage from "./useLanguage";
import {Link} from "react-router-dom"
const MobileMenuList = () => {
  const {t, i18n, lang} = useLanguage();
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    setMenu(i18n.store.data[lang].translation.menuList)
  }, [lang, setMenu, i18n.store.data])
 
  return (
    <Wrapper>
      <h5 className="menu-title">{t("menu")}</h5>
      <ul>
        {menu.map(item => (
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
  .menu-title{
    padding : 1rem 1.6rem;
  }
  ul{
    list-style:  none ; 
  }
  .link-item{
    display : flex;    
    margin : 0 1rem;
    justify-content : flex-start;
    align-items :center;  
    padding : 0.6rem;  
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
