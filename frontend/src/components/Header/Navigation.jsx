import React, { useEffect, useState } from "react";
import useLanguage from "../Global/useLanguage";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Tooltips from "./Tooltips";
import {useThemeUI} from "theme-ui"
const Navigation = () => {
  const { i18n, lang } = useLanguage();
  const [menu, setMenu] = useState([]);
  const [showTooltips, setshowTooltips] = useState("") ; 
  const {colorMode} = useThemeUI()
  useEffect(() => {
    setMenu(i18n.store.data[lang].translation.navigationAuth);
  }, [lang, i18n.store.data]);
  if (!menu.length) return null;
  return (
    <NavigationWrapper theme={colorMode}>
      {menu.map((item) => (
        <li key={item.name} className="nav-item">
          <NavLink
            exact
            to={item.path}
            className="nav-link"
            activeClassName="nav-link-active"
            onMouseOver={() => setshowTooltips(item.name)}
            onMouseOut={() => setshowTooltips("")}
          >
            <span className="nav-icon" title={item.name}>
              {item.icon()}
            </span>
            <span className="nav-name"> {item.name}</span>
          </NavLink>
          <Tooltips showTooltips={showTooltips === item.name}>{item.name}</Tooltips>
        </li>
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
  .nav-item{
    position : relative;        
    height: 100%; 
  }
  .nav-link {
    transition: var(--mainTransition);
    display: flex;
    flex-direction: column;
    justify-content : center;
    align-items: center;
    padding: 1rem;        
    height : 100% ; 

    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid ${({theme}) => theme === "dark" ? "var(--light)" : "var(--dark)"} ;
    }
  }
  .nav-icon {
    display: flex;
    font-size: 1.25rem;
    margin-top: 0.1rem;
    margin-right: 0.15rem;
  }
  .nav-name {
    font-size: 0.85rem;
  }
  .nav-link-active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary) !important ;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .nav-name {
      display: none;
    }
    .nav-icon {
      font-size: 1.5rem;
    }
  }
`;

export default React.memo(Navigation);
