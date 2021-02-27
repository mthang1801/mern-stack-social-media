import styled from "styled-components";

export const RequestAuthScreen = styled.div`
  margin-top : 60px;
  width : 100vw;
  height : calc(100vh - 60px);  
  & > div{
    margin: 10rem auto;
  }
`

export const ChatsWrapper = styled.div`
  margin-top : 60px;
  width : 100vw; 
  height: calc(100vh - 60px) ;
`

export const SidebarNav = styled.nav`
  position : fixed;
  bottom : 0; 
  width : 100vw;
  height: 60px;
  background : linear-gradient(to bottom, #039be5,#0288d1, #0277bd , #01579b );
  box-shadow : var(--lightShadow);
  display : flex;
  justify-content: space-between; 
  @media screen and (min-width: 768px){
    left: 0 ;
    bottom : unset;
    width : 65px;  
    height: 100%;
    flex-direction : column ; 
    justify-content: flex-start;
    align-items: center;
  }
`

export const MainTab = styled.div`
  width : 100vw; 
  height: calc(100vh - 120px);
  margin-top : 60px;  
  @media screen and (min-width: 768px){    
    width : calc(100vw - 65px);  
    height: 100%;
    margin-left: 65px;    
  }
`