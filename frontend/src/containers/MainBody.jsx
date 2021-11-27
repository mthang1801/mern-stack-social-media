import React from 'react';
import { Wrapper, AsideComponent, Main } from './styles/MainBody.styles';
import Aside from '../components/Aside/Aside';
import { useTheme } from '../theme';
import { toggleFriendsBoardVar } from '../apollo/cache';
import { useReactiveVar } from '@apollo/client';
// This body used for home, notifications and global page
const MainBody = ({ children }) => {
  const { theme } = useTheme();
  const toggleFriendsBoard = useReactiveVar(toggleFriendsBoardVar);
  return (
    <Wrapper theme={theme}>
      <AsideComponent openFriendBoard={toggleFriendsBoard}>
        <Aside />
      </AsideComponent>
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default MainBody;
