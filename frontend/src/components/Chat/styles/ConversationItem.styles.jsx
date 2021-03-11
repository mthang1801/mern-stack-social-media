import styled from "styled-components";

export const ConversationItemWrapper = styled.div`
  width : 100%; 
  display : grid; 
  grid-template-columns : 1fr 3fr 2.5fr;
  grid-gap: 0.5rem;
  cursor:pointer;
  padding: 0.5rem;  
  & > *{
    overflow : hidden ;
    white-space: nowrap; 
    text-overflow: ellipsis;
  }
  @media (min-width: 600px) and (max-width :768px){
    grid-template-columns : 1fr 4fr 3fr;
  }
  &:hover{
    background-color : ${({theme}) => theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-default)"};
  }
  ${({active, theme}) => active && `
    background-color : ${theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-default)"};
  `}
  ${({hasSeenLatestMessage}) => !hasSeenLatestMessage && `
    & *{
      font-weight: 600 !important;
    }
  `}
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

export const ConversationOverview = styled.div`
  width : 100%;   
  overflow : hidden;
  h4{
    font-size : 1rem;
    font-weight: 400;
  }
  span{
    font-size : 0.9rem;
    opacity: 0.8;
  }
`

export const ConversationControls = styled.div`  
  display : flex; 
  flex-direction : column; 
  justify-content : space-between;
  align-items : flex-end;
  time{
    font-size : 0.7rem;
    opacity: 0.5;
    ${({hasSeenLatestMessage}) => !hasSeenLatestMessage && `
      color : var(--red);
      opacity: 1;
    `}
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