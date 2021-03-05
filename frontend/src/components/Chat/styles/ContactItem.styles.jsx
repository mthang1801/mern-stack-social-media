import styled from "styled-components";

export const ContactItemWrapper = styled.div`
  width : 100%; 
  display : flex;
  align-items: center;
  cursor:pointer;
  padding: 0.5rem;  
  &:hover{
    background-color : ${({theme}) => theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-default)"};
  }
`

export const Avatar = styled.div`
  width : 2.5rem;
  height: 2.5rem;
  & img{
    width : 100%;
    border-radius : 50%;
  }
`

export const UserContactOverview = styled.div`
  flex: 1;
  margin-left: 1rem;
  overflow : hidden;
  h4{
    font-size : 1rem;
  }
  font-weight : normal;
`

export const ContactControls = styled.div`  
  display : flex; 
  flex-direction : column; 
  justify-content : space-between;
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