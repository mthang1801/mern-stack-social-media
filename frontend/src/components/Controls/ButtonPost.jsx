import React from 'react'
import styled  from "styled-components"
const ButtonPost = ({children,color, ...props }) => {
  return (
    <Button {...props} color={color}>
      {children}
    </Button>
  )
}

const Button = styled.button`
  outline : none ; 
  border: none  ;
  background-color : transparent ; 
  color : ${({color}) => color ? color : "inherit"};
  display : inline-flex; 
  justify-content : center;
  align-items : center;
  width : 40px;
  height : 40px;
  border-radius : 50% ; 
  font-size : 1.2em;
  cursor : pointer;
  transition : var(--mainTransition);
  &:hover{
    background-color : var(--gray-light);
  }
`

export default ButtonPost
