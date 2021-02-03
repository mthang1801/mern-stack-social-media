import React from "react";
import styled from "styled-components";
const ButtonHeader = ({ children,...props }) => {
  return <Button {...props}>{children}</Button>;
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({variant}) => variant === "outlined" ? "transparent" : "var(--light)"};
  height: 40px;
  width: 40px;
  font-size : 1em;
  border-radius: 50%;
  outline : none ; 
  border: none ; 
  transition: var(--mainTransition);
  cursor: pointer;
  
  &:hover {
    background-color: var(--gray-deep);
  }
  &  img{
    width : 100% ; 
  }
`;

export default ButtonHeader;
