import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"
const ButtonLogin = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

const Button = styled(Link)`
  border-radius: 1.5rem;
  padding: 0.25rem 1rem;
  display : flex; 
  align-items : center;
  justify-content : center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: var(--mainTransition);
  text-transform: uppercase;
  font-weight: bolder;  
  border: 1px solid var(--primary);
  color: var(--primary);
  &:hover {
    color: var(--light);
    background-color: var(--primary);
    box-shadow: var(--lightShadow);
  };

  font-family : var(--fontFamily);
`;

export default ButtonLogin;
