import React from 'react';
import styled from 'styled-components/macro';
import { useTheme } from '../../theme';
const ButtonMenu = ({ onClick }) => {
  const { theme } = useTheme();
  return (
    <ToggleButton onClick={onClick} theme={theme}>
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
      theme ? theme.background : 'var(--background)'};
  }

  &:hover {
    span {
      background-color: ${({ theme }) =>
        theme ? theme.backgroundSecondary : 'var(--backgroundSecondary)'};
    }
  }
`;

export default ButtonMenu;
