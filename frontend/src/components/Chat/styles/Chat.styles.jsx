import styled from 'styled-components/macro';

export const Wrapper = styled.main`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  width: 100vw;
  overflow-y: hidden;
  height: 90%;
  @media screen and (min-width: 768px) {
    border-right: 1px solid
      ${({ theme }) =>
        theme === 'dark'
          ? 'var(--color-border-dark)'
          : 'var(--color-border-default)'};
    box-shadow: var(--lightShadow);
    height: 100%;
    width: 300px;
    overflow-y: hidden;
  }
  @media screen and (min-width: 992px) {
    width: 30%;
  }
  @media screen and (min-width: 1280px) {
    width: 25%;
  }
`;

export const RightSide = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: calc(100% - 300px);
  }
  @media screen and (min-width: 992px) {
    width: 70%;
  }
  @media screen and (min-width: 1280px) {
    width: 75%;
  }
`;

export const PopupSettings = styled.div`
  position: fixed;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  left: ${({ left }) =>
    left > 340 ? '370px' : left > 300 ? '350px' : `${left}px`};
  top: ${({ top }) => top - 50 + 'px'};
  width: 12rem;
  background-color: white;
  border: 1px solid var(--gray-deep);
  border-radius: 0.4rem;
  flex-direction: column;
  font-size: 0.85rem;
  & span {
    padding: 0.5rem 1rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      background-color: lightblue;
    }
  }
  z-index: 2;
`;
