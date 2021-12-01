import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  margin: 1.5rem auto;
  @media screen and (min-width: 992px) {
    width: 85vw;
    display: flex;
  }
  @media screen and (min-width: 1280px) {
    width: 75vw;
  }
  @media screen and (min-width: 1920px) {
    width: 50vw;
    display: flex;
    justify-content: space-between;
  }
`;

export const LeftSide = styled.div`
  @media screen and (min-width: 992px) {
    width: 360px;
  }
  @media screen and (min-width: 1280px) {
    width: 400px;
  }
`;

export const RightSide = styled.div`
  @media screen and (min-width: 992px) {
    width: calc(100% - 360px);
  }
  @media screen and (min-width: 1280px) {
    width: 48%;
  }
`;
