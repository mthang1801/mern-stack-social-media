import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const LinkItem = styled(NavLink)`
  font-size: 1.3rem;
  width: 100%;
  padding: 1rem;
  display: block;
  text-align: center;
  color: white;
  &:hover {
    color: var(--white);
    background-color: #29b6f6;
    opacity: 1;
  }
`;

export const Wrapper = styled.main`
  width : 100%;
  height: calc(100vh - 60px);
  display : flex;    
  overflow : hidden;
`

export const LeftSide = styled.div`
  width: 100vw;  
  overflow : auto;
  height : 90%  ;
  @media screen and (min-width: 768px) {
    border-right : 1px solid ${({theme}) => theme === "dark" ? "var(--color-border-dark)" : "var(--color-border-default)"};
    box-shadow : var(--lightShadow);
    height: 100%;
    width: 300px;
    overflow : auto;
  }
  @media screen and (min-width: 992px) {
    width: 30%;    
  }
  @media screen and (min-width: 1280px){
    width : 25%;
  }
`;

export const RightSide = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display : block;
    width: calc(100% - 300px);
  }
  @media screen and (min-width: 992px) {
    width: 70%;   
  }
  @media screen and (min-width: 1280px){
    width : 75%;
  }
`;
