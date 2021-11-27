import styled, { css } from 'styled-components/macro';

export const ButtonClose = styled.button`
  outline: none;
  border: 1px solid var(--gray-light-1);
  background-color: var(--gray-light-1);
  font-size: 1rem;
  border-radius: 50%;
  padding: 0.25rem;
  display: inline-flex;
  margin-right: 1rem;
  cursor: pointer;
`;

export const FriendsListWrapper = styled.div`
  height: 100%;
  min-height: 95vh;
  width: 100%;
  box-shadow: var(--mediumShadow);
  transition: var(--mainTransition);
  border-left: 1px solid
    ${({ theme }) => (theme ? theme.border : 'var(--border)')};

  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  position: relative;
  ${({ show }) =>
    show
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(100%);
        `}
`;

export const LeftSide = styled.div`
  display: flex;
  width: ${({ hide }) => (hide ? '0' : 'auto')};
  visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  transform: ${({ hide }) => (hide ? 'translateX(-200%)' : 'translateX(0)')};
  transition: 0.12s all;
  transition-delay: 0.1;
`;

export const TitleContacts = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const FriendsListSearch = styled.div`
  flex: ${({ show }) => (show ? 1 : 'unset')};
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: var(--secondTransition);
  background-color: ${({ theme }) =>
    theme ? theme.background : 'var(--background)'};
  border-radius: 3rem;
  overflow: hidden;
  width: ${({ show }) => (show ? '90%' : '2rem')};
  transition-delay: width 0.15s;
  input {
    flex: 1;
    display: ${({ show }) => (show ? 'block' : 'none')};
    width: ${({ show }) => (show ? 'calc(100% - 2rem)' : 0)};
    padding: 0 0.7rem;
    background-color: ${({ theme }) =>
      theme ? theme.background : 'var(--background)'};
    outline: none;
    border: ${({ theme }) => (theme ? theme.border : 'var(--border)')};
    font-size: 1rem;
    color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
  }

  button {
    outline: none;
    border: none;
    text-align: center;
    width: 2rem;
    height: 2rem;
    background-color: ${({ theme }) =>
      theme ? theme.background : 'var(--background)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) =>
        theme === 'dark' ? 'var(--gray)' : 'var(--gray-deep)'};
    }
  }
`;

export const FriendsListTitle = styled.h4`
  font-size: 1.1rem;
`;
