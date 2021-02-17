import React from 'react'
import styled from "styled-components"
import ButtonLogin from "../Controls/ButtonLogin"
import ButtonSignUp from "../Controls/ButtonSignUp"
import {useThemeUI} from "theme-ui"
import {useLocation} from "react-router-dom"
const CardRequestAuth = () => {
  const {colorMode} = useThemeUI()
  const {pathname} = useLocation()
 
  return (
    <CardWrapper theme={colorMode}>
      <h4>You need to login or signup to continue</h4>
      <div className="buttons-container">
        <ButtonLogin to="/auth" from={pathname}>Login</ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>Signup</ButtonSignUp>
      </div>
    </CardWrapper>
  )
}
const CardWrapper =  styled.div`
  text-align: center;
  padding : 2rem;
  background-color : ${({theme}) => theme==="dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  border-radius : 0.75rem;
  box-shadow : var(--lightShadow);
  h4{
    font-size : 1.1em;
    font-weight : 500;    
  }
.buttons-container{
  display : flex;
  margin: 1rem auto;
  justify-content : space-around;
  & > *{
    width  45%;
  }  
}

`

export default CardRequestAuth
