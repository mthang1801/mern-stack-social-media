import React from 'react'
import styled from "styled-components"
import {useThemeUI} from "theme-ui";
import {IoMdContacts, IoMdCloseCircleOutline} from "react-icons/io"
const ButtonOpenFriendsList = ({...props}) => {
  const {colorMode} = useThemeUI();  
  
  return (
    <Button {...props} theme={colorMode} >
      {props.hide ? <IoMdCloseCircleOutline/> : <IoMdContacts/>}
    </Button>
  )
}

const Button = styled.button`
  width : 60px;
  height: 60px;
  font-size : 2rem;
  position : absolute;
  bottom : 2rem;
  right: 2rem;
  border-radius : 50%;
  display : flex;
  align-items: center;
  justify-content : center;
  border: none; 
  outline: none ; 
  background : ${({hide}) => hide ? "linear-gradient(to right bottom, #ed1f33 40%, #e61025 100%)" : "linear-gradient(to right bottom, #39f029 40%, #1ede0d 100%)" } ;
  color : var(--light);
  cursor: pointer;
  box-shadow : 0px 1px 1px 1px rgba(0,0,0,0.2);
  transition : var(-mainTransition);
  &:hover{
    background :  ${({hide}) => hide ? "linear-gradient(to right bottom, #d61c2e 40%, #cf081b 100%); " : "linear-gradient(to right bottom, #31d622 40%, #1ccc0c 100%)"} ;
  }
  &:active{
    transform : translateY(-3px);
  }
  // opacity : ${({hide}) => hide ? 0 : 1};
  // visibility : ${({hide}) => hide ? "hidden" : "visible"};
`

export default ButtonOpenFriendsList
