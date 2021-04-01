import styled from "styled-components";
import {Link} from "react-router-dom";
export const CommentContainer = styled.div`
  width : 100% ; 
  padding : 0.3rem 1rem;
  display : flex; 
`

export const UserAvatar = styled.div`
  width : 2rem;
  height : 2rem;
  img {
    width : 100%; 
    border-radius : 50%;
  }
`
export const CommentContent = styled.div`
  flex : 1; 
  display : flex;
  flex-direction : column;
  margin-left: 0.5rem;
`;

export const CommentText = styled.div`
  font-size : 0.88rem;
  border : 1px solid ${({theme}) => theme === "dark" ? "var(--color-border-dark)" : "var(--color-border-default)"};  
  border-radius:  0.5rem;
  padding: 0.25rem 0.7rem;  
  opacity : 0.8;
`

export const UserName = styled(Link)`
  font-size : 0.95rem ; 
  font-weight : bold;  
  opacity : 1 
  &:hover{
    opacity : 1 ;
  }
`

export const CommentControls = styled.div`
  font-size : 0.85rem;
  `
export const ControlItem = styled.span`
  margin : 0 0.4rem;
  cursor : pointer;
  opacity : 0.7;
  ${({active}) => active && "color: var(--blue-1)"};  
`

export const ResponseComponent = styled.div`
  width : 95%;
  margin: 0.5rem 0 0.5rem auto;
  display :flex;
`

export const Response = styled.div`
  flex : 1 ;
  margin-left : 0.5rem;
`