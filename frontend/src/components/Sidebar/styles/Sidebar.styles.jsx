import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const FriendsBoardWrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  height: calc(100% - 60px);
  width: 300px;
  overflow: auto;
  transition: var(--mainTransition);
  z-index: ${({ show }) => (show ? 2 : -1)};
`;
