import styled from 'styled-components';

export const RequestAuthScreen = styled.div`
  margin-top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  & > div {
    margin: 10rem auto;
  }
`;

export const ConversationsWrapper = styled.div`
  margin-top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
`;

export const Tabs = styled.ul`
  height: 100%;
  width: 60px;
  background-color: ${({ theme }) =>
    theme ? theme.panelBackground : 'var(--panelBackground)'};
`;

export const Tab = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  cursor: pointer;
  & svg {
    font-size: 1.25rem;
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
  background-color: ${({ active, theme }) =>
    active
      ? theme
        ? theme.hover.background
        : 'var(--hover-background)'
      : 'unset'};
`;

export const MainSide = styled.main`
  width: 100%;
  display: flex;
`;
