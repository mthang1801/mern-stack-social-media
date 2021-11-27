import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const NotificationsContent = styled.section`
  width: 90%;
  margin: auto;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
  @media screen and (min-width: 992px) {
    width: 60%;
  }
  @media screen and (min-width: 1280px) {
    width: 70%;
  }
`;

export const OtherContents = styled.section`
  width: 90%;
  margin: auto;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
  @media screen and (min-width: 992px) {
    width: 40%;
  }
  @media screen and (min-width: 1280px) {
    width: 30%;
  }
  background-color: yellow;
`;
