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
  height: ${({height}) => height ? `${height}px` : "auto"};
  width: ${({width}) => width ? `${width}px` : "auto"};
  font-size: 1rem;
  border-radius: 0.4rem;
  padding: 0.4rem 0.6rem;  
  text-transform : uppercase ;
  outline: none;
  border: none;
  transition: var(--mainTransition);
  cursor: pointer;
  color : ${({color}) => color ? invert(`${color}`) : "inherit"}  ;
  &:hover {
    background-color: ${({ color, theme }) =>
      color
        ? `${darken(0.1, `${color}`)}`
        : theme === "dark"
        ? `${darken(0.1, "#454545")}`
        : `${darken(0.005, "#dedede")}`};
  }
  & img {
    width: 100%;
  }
`;

export default ButtonDefault;
