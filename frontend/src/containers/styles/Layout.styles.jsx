import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  .small-viewport-menu-list {
    width: 100vw;
    position: fixed;
    height: calc(100vh - 60px);
    background-color: ${({ theme }) =>
      theme ? theme.background : 'var(--background)'};
    transition: var(--mainTransition);
    opacity: 1;
    overflow-x: hidden;
    z-index: 1000;
  }
  .hide-small-viewport-list {
    height: 0 !important;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  @media screen and (min-width: 992px) {
    .small-viewport-menu-list {
      display: none;
    }
  }
`;
