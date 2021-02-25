import React from "react";
import styled from "styled-components";
import { useThemeUI } from "theme-ui";
import { darken, invert } from "polished";
const ButtonDefault = ({ children, ...props }) => {
  const { colorMode } = useThemeUI();
  return (
    <Button theme={colorMode} {...props}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ variant, color, theme }) =>
    variant === "outlined"
      ? "transparent"
      : color
      ? `${color}`
      : theme === "dark"
      ? "var(--gray-dark)"
      : "var(--light)"};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  font-size: 1rem;
  border-radius: 0.4rem;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  outline: none;
  border: none;
  transition: var(--mainTransition);
  cursor: pointer;
  color: ${({ color }) => (color ? invert(`${color}`) : "inherit")};
  &:hover {
    background-color: ${({ color, theme }) =>
      color
        ? `${darken(0.1, `${color}`)}`
        : theme === "dark"
        ? `${darken(0.1, "#454545")}`
        : `${darken(0.005, "#dedede")}`};
  }

  ${({ accept }) =>
    accept &&
    `
    background-color : #43a047 ;
    color: white;
    &:hover{
      background-color : #2e7d32 ;
    }
  `}

  ${({ cancel }) =>
    cancel &&
    `
  background-color : #e53935 ; 
  color : white;
  &:hover{
    background-color : #c62828;    
  }`}

  ${({ reject }) =>
    reject &&
    `
    background-color : #9e9e9e ;
    color : var(--dark); 
    &:hover{
      background-color : #424242;
      color : var(--white);
    }
  `}

  ${({chat}) => chat && `
  background-color : transparent ;
  color : #43a047 ; 
  font-size : 1.4rem;
  &:hover{
    background-color : transparent ;
    color : #2e7d32;    
  }
  `}
  ${({call}) => call && `
  background-color : transparent ;
  color : var(--primary); 
  font-size : 1.4rem;
  &:hover{
    background-color : transparent ;
    color : #003f9c;    
  }
  `}
  ${({videocall}) => videocall && `
  background-color : transparent ;
  color : #fb8c00; 
  font-size : 1.4rem;
  &:hover{
    background-color : transparent ;
    color : #ef6c00;    
  }
  `}

  
  ${({favorite}) => favorite && `
  background-color : transparent ;
  color : #d81b60; 
  font-size : 1.4rem;
  &:hover{
    background-color : transparent ;
    color : #ad1457 ;    
  }
  `}
  ${({setting}) => setting && `
  background-color : transparent ;
  color : inherit; 
  opacity: 0.75;
  font-size : 1.4rem;
  &:hover{
    background-color : transparent ;
    color : inherit ;    
    opacity : 1;
  }
  `}


  & img {
    width: 100%;
  }
`;

export default ButtonDefault;
