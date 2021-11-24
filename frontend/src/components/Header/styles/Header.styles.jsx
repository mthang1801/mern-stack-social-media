import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  button:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Notification = styled.div`
  position: relative;
`;

export const UnseenNotification = styled.div`
  position: absolute;
  top: -20%;
  right: -15%;
  background-color: var(--red);
  padding: 0.15rem 0.4rem;
  color: white;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  font-weight: bolder;
`;

export const NotificationBoard = styled.div`
  position: absolute;
  top: 125%;
  right: -100%;
  z-index: ${({ open }) => (open ? 1 : -1)};
  transition: var(--mainTransition);
  width: 360px;
  height: ${({ open }) => (open ? '400px' : '0')};
  border: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
  overflow: auto;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  border-radius: 0.5rem;
`;
