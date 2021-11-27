import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
export const Wrapper = styled.section`
  background-color: ${({ hasSeen, theme }) =>
    theme
      ? hasSeen
        ? theme.notification.hasSeen
        : theme.notification.unSeen
      : hasSeen
      ? 'var(--notification-hasSeen)'
      : 'var(--notification-unSeen'};
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
`;

export const LinkWrapper = styled(Link)`
  display: flex;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
`;

export const AvatarContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const NotificationContent = styled.article`
  margin-left: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Controls = styled.div`
  padding: 0.75rem 1.25rem;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  padding: 1rem;
`;

export const ButtonAccept = styled.button`
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  background-color: #16c172e3;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--white);
  &:hover {
    background-color: #009651e3;
  }
`;
export const ButtonDecline = styled.button`
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  background-color: #ec1b1be3;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--white);
  &:hover {
    background-color: #c70000e3;
  }
`;
