import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  margin: 1.5rem auto;
  @media screen and (min-width: 992px) {
    width: 85%;
    display: flex;
  }
  @media screen and (min-width: 1280px) {
    width: 65%;
  }
`;

export const LeftSide = styled.div`
  @media screen and (min-width: 992px) {
    width: 360px;
  }
  @media screen and (min-width: 1280px) {
    width: 40%;
  }
`;

export const RightSide = styled.div`
  @media screen and (min-width: 992px) {
    width: calc(100% - 360px);
  }
  @media screen and (min-width: 1280px) {
    width: 60%;
  }
`;
