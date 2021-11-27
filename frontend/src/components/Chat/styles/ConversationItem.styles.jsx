import styled from 'styled-components/macro';

export const ConversationItemWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 2.5fr;
  grid-gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @media (min-width: 600px) and (max-width: 768px) {
    grid-template-columns: 1fr 4fr 3fr;
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
  ${({ active, theme }) =>
    active &&
    `
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  `}
  ${({ hasSeenLatestMessage }) =>
    !hasSeenLatestMessage &&
    `
    & *{
      font-weight: 600 !important;
    }
  `}
`;

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  & img {
    width: 100%;
    border-radius: 50%;
  }
  ${({ active }) =>
    active &&
    `
    & img {
      border: 2px solid var(--green-1);
    }
    &::after{
      position: absolute;
      content: ""; /* this is important */
      height: 0.5rem;
      width: 0.5rem;
      border-radius : 50%;
      background-color : var(--green-1);
      right: 0%;
      top: 70%;
    }
  `}
`;

export const ConversationOverview = styled.div`
  width: 100%;
  overflow: hidden;
  h4 {
    font-size: 1rem;
    font-weight: 400;
  }
  span {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const ConversationControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  time {
    font-size: 0.7rem;
    opacity: 0.5;
    ${({ hasSeenLatestMessage }) =>
      !hasSeenLatestMessage &&
      `
      color : var(--red-1);
      opacity: 1;
    `}
  }
  span {
    display: block;
    cursor: pointer;
    margin-left: auto;
    text-align: right;
    font-size: 1.2rem;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transition: var(--mainTransition);
    color: inherit;
  }
`;
