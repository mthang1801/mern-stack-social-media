import styled from "styled-components";

export const Wrapper = styled.div`
  margin : 1.5rem auto;
  @media screen and (min-width: 992px){
    width: 80%;     
  }
  @media screen and (min-width: 1280px){
    width: 70%;     
    display : flex;
  }
`

export const LeftSide = styled.div`  
  @media screen and (min-width: 992px){
    width: 360px;    
  }  
`

export const RightSide = styled.div`
  @media screen and (min-width: 992px){    
    width: calc(100% - 360px);
  }
`