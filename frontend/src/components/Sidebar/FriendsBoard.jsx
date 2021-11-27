import React, { useState } from 'react';
import FriendsList from './FriendsList';
import ButtonToggleFriendsList from '../Controls/ButtonToggleFriendsList';
import { FriendsBoardWrapper } from './styles/Sidebar.styles';
import { useReactiveVar } from '@apollo/client';
import { toggleFriendsBoardVar } from '../../apollo/cache';
const FriendsBoard = () => {
  const toggleFriendsBoard = useReactiveVar(toggleFriendsBoardVar);
  return (
    <FriendsBoardWrapper show={toggleFriendsBoard}>
      <FriendsList
        show={toggleFriendsBoard}
        close={() => toggleFriendsBoardVar(false)}
      />
    </FriendsBoardWrapper>
  );
};

export default React.memo(FriendsBoard);
