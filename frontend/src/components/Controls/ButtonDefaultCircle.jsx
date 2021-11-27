import React from 'react';
import styled from 'styled-components/macro';
import { useTheme } from '../../theme';
import { darken, invert } from 'polished';
const ButtonDefaultCircle = ({ children, ...props }) => {
  const { theme } = useTheme();
  return (
    <Button theme={theme} {...props}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'var(--gray-2)' : 'var(--light-gray-2)'};
  height: 40px;
  width: 40px;
  font-size: 1em;
  border-radius: 50%;
  outline: none;
  border: none;
  transition: var(--mainTransition);
  cursor: pointer;
  color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
  &:hover {
    background-color: ${({ color, theme }) =>
      color
        ? `${darken(0.1, `${color}`)}`
        : theme.name === 'dark'
        ? `${darken(0.1, '#454545')}`
        : `${darken(0.005, '#dedede')}`};
    opacity: 0.65;
  }
  & img {
    width: 100%;
  }
`;

export default ButtonDefaultCircle;
