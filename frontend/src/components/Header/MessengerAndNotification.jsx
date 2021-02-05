import React from 'react'
import styled from "styled-components";
import {FaFacebookMessenger} from "react-icons/fa"
import {IoMdNotifications} from "react-icons/io"
import Button from "../Controls/ButtonDefault"
const Control = () => {
  
  return (
    <Wrapper>
      <Button><FaFacebookMessenger/></Button>
      <Button><IoMdNotifications/></Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-size : 1.2rem;
  display : flex ; 
  button:not(:last-child) {
    margin-right : 0.5rem;
  }
`

export default Control
