import React, { useEffect, useState } from "react";
import useLanguage from "../Global/useLanguage";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const Navigation = () => {
  const { i18n, lang } = useLanguage();
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    setMenu(i18n.store.data[lang].translation.navigationAuth);
  }, [lang]);
  if (!menu.length) return null;
  return (
    <NavigationWrapper>
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <span className="nav-icon" title={item.name}>{item.icon()}</span>
          <span className="nav-name"> {item.name}</span>
        </NavLink>
      ))}
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;  
  .nav-link {
    transition: var(--mainTransition);
    display: flex;    
    align-items: center;
    padding: 1rem;
    border-bottom: 2px solid transparent ;
    &:hover {
      border-bottom: 2px solid var(--dark);
    }
  }
  .nav-icon {
    display : flex ;     
    font-size: 1.2rem;
    margin-top: 0.1rem;
    margin-right:0.15rem;
  }
  .nav-link-active {
    color: var(--primary);
  }
  @media screen and (min-width: 768px) and (max-width: 992px){
    .nav-name{
      display : none;
    }
    .nav-icon{
      font-size : 1.5rem;
    }
  }
`;

export default Navigation;
