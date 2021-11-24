import React from 'react';
import styled from 'styled-components';
import { useThemeUI } from 'theme-ui';
const ButtonMenu = ({ onClick }) => {
  const { colorMode } = useThemeUI();
  return (
    <ToggleButton onClick={onClick} theme={colorMode}>
      <span></span>
      <span></span>
      <span></span>
    </ToggleButton>
  );
};

const ToggleButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1rem;
  cursor: pointer;
  z-index: 500;
  span {
    display: inline-block;
    width: 1.5rem;
    height: 2px;
    background-color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-background-default)'
        : 'var(--color-background-dark)'};
  }

  &:hover {
    span {
      background-color: ${({ theme }) =>
        theme === 'dark'
          ? 'var(--color-background-default-secondary)'
          : 'var(--color-background-dark-secondary)'};
    }
  }
`;

export default ButtonMenu;
