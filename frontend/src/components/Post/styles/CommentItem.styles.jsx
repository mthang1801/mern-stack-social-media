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
export const CommentText = styled.div`
  font-size : 0.88rem;
  border : 1px solid ${({theme}) => theme === "dark" ? "var(--color-border-dark)" : "var(--color-border-default)"};
  flex : 1; 
  margin-left: 0.5rem;
  border-radius:  0.5rem;
  padding: 0.25rem 0.7rem;  
  opacity : 0.8;
`

export const UserName = styled(Link)`
  font-size : 0.95rem ; 
  font-weight : bold;
  text-transform : capitalize; 
  opacity : 1 
  &:hover{
    opacity : 1 ;
  }
`