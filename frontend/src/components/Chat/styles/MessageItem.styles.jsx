import styled from "styled-components";

export const MessageItemWrapper = styled.div`
  width : 100%; 
  display : grid; 
  grid-template-columns : 1fr 3fr 1fr;
  grid-gap: 0.5rem;
  cursor:pointer;
  padding: 0.5rem;  
  @media (min-width: 600px) and (max-width :768px){
    grid-template-columns : 1fr 5fr 1fr;
  }
  &:hover{
    background-color : ${({theme}) => theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-default)"};
  }
`

export const Avatar = styled.div`
  width : 100%;
  max-width : 4rem;
  max-height: 4rem;
  & img{
    width : 100%;
    border-radius : 50%;
  }
`

export const UserMessageOverview = styled.div`
  width : 100%;   
  overflow : hidden;
  h4{
    font-size : 1rem;
  }
`

export const MessageControls = styled.div`  
  display : flex; 
  flex-direction : column; 
  justify-content : space-between;
  align-items : flex-end;
  time{
    font-size : 0.85rem;
    opacity: 0.3;
  }
  span{
    display : block;
    cursor : pointer;
    margin-left: auto;
    text-align :right;
    font-size : 1.2rem;    
    opacity : ${({show}) => show ? 1 : 0};
    visibility : ${({show}) => show ? "visible" : "hidden"};
    transition : var(--mainTransition);
    color : inherit;
  }
  
`