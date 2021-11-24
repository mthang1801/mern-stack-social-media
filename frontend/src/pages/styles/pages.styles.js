import styled from 'styled-components';

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1.5rem 0;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media screen and (min-width: 992px) {
    padding: 0;
  }
`;

export const MainContentLeftSide = styled.div`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: calc(100% - 320px);
    padding: 0 1rem;
  }
  @media screen and (min-width: 992px) {
    width: 60%;
  }
  @media screen and (min-width: 1920px) {
    width: 65%;
  }
`;

export const MainContentRightSide = styled.div`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 320px;
    padding: 0 1rem;
  }
  @media screen and (min-width: 992px) {
    width: 40%;
  }
  @media screen and (min-width: 1920px) {
    width: 35%;
  }
`;

export const MainContentFullSize = styled.div`
  width: 95%;
  margin: auto;
  @media screen and (min-width: 768px) {
    width: 90%;
  }
  @media screen and (min-width: 992px) {
    width: 80%;
  }
  @media screen and (min-width: 1920px) {
    width: 60%;
  }
`;

export const ContactTitle = styled.h2`
  margin: 0 auto 3rem auto;
  font-size: 1.8rem;
`;
