import React from 'react'
import styled from "styled-components";

const ButtonMenu = ({onClick}) => { 
  
  return (
    <ToggleButton onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </ToggleButton>
  )
}

const ToggleButton = styled.div`  
  display : flex ; 
  flex-direction : column ; 
  justify-content : space-between;
  height : 1rem; 
  cursor : pointer;  
  z-index : 500 ;
  span{
    display : inline-block ; 
    width : 1.5rem;
    height: 2px; 
    background-color : var(--purple);        
  }
  &:hover{
    span {
      background-color : var(--indigo);     
    }
  }   
`

export default ButtonMenu
