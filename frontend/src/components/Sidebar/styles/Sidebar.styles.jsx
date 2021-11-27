import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const FriendsBoardWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  overflow: auto;
  transition: var(--mainTransition);
  z-index: ${({ show }) => (show ? 9999 : -1)};
`;
