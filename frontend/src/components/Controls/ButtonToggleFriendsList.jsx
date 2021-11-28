import React from 'react';
import styled from 'styled-components/macro';
import { useTheme } from '../../theme';
import { IoMdContacts, IoMdCloseCircleOutline } from 'react-icons/io';
import useLocale from '../../locales';
const ButtonOpenFriendsList = ({ ...props }) => {
  const { theme } = useTheme();
  const { translation } = useLocale();

  return (
    <Button
      {...props}
      theme={theme}
      title={translation.controls.openFriendsList}
    >
      <IoMdContacts />
    </Button>
  );
};

const Button = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background: linear-gradient(to right bottom, #39f029 40%, #1ede0d 100%);
  color: var(--light-gray-1);
  cursor: pointer;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    background: linear-gradient(to right bottom, #31d622 40%, #1ccc0c 100%);
  }
  &:active {
    transform: translateY(-3px);
  }
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  z-index: 10;
`;

export default ButtonOpenFriendsList;
