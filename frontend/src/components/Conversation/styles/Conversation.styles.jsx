import styled from 'styled-components/macro';

export const LeftSide = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media screen and (min-width: 992px) {
    width: 280px;
  }
  @media screen and (min-width: 1280px) {
    width: 320px;
  }
`;
export const RightSide = styled.div`
  display: none;
  height: 100%;
  flex: 1;

  @media screen and (min-width: 992px) {
    display: block;
    width: calc(100%-280px);
  }
  @media screen and (min-width: 1280px) {
    width: calc(100%-320px);
  }
`;

export const NotFound = styled.p`
  color: var(--red-1);
  text-align: center;
`;

export const SettingDialog = styled.div`
  position: fixed;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 160px;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  font-size: 16px;
  border-radius: 5px;
  overflow: hidden;
  & p {
    padding: 0.25rem 0.5rem;
    &:hover {
      background-color: ${({ theme }) =>
        theme ? theme.hover.background : 'var(--hover-background)'};
      cursor: pointer;
    }
    &:first-child,
    &:last-child {
      padding: 0.4rem 0.5rem;
    }
  }
`;
