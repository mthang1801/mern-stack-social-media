import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  padding: 0 0.4rem;
  position: relative;
  @media screen and (min-width: 992px) {
    padding: 0 1rem;
  }
`;

export const AsideComponent = styled.aside`
  display: none;
  @media screen and (min-width: 992px) {
    display: -webkit-box;
    position: fixed;
    width: 320px;
    height: calc(100vh - 60px);
    padding: 1rem 1.5rem;
  }
`;

export const Main = styled.div`
  width: 100%;
  @media screen and (min-width: 992px) {
    
      margin-left: 320px;
      padding: 1.5rem 0;
      width: calc(100% - 320px);
    
  }
`;
