import React from 'react';
import styled from 'styled-components/macro';
import { useTheme } from '../../theme';
import useLocale from '../../locales';
import { BiConversation } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
const ButtonOpenFriendsList = ({ ...props }) => {
  const { theme } = useTheme();
  const { translation } = useLocale();
  const history = useHistory();

  return (
    <Button
      {...props}
      theme={theme}
      title={translation.controls.openFriendsList}
      onClick={() => history.push('/conversations')}
    >
      <BiConversation />
    </Button>
  );
};

const Button = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2rem;
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background: linear-gradient(
    to right bottom,
    var(--blue-1) 40%,
    var(--blue-2) 100%
  );
  color: var(--light-gray-1);
  cursor: pointer;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    background: linear-gradient(
      to right bottom,
      var(--blue-2) 40%,
      var(--blue-3) 100%
    );
  }
  &:active {
    transform: translateY(-3px);
  }
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  z-index: 10;
`;

export default ButtonOpenFriendsList;
