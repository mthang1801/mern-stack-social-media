import React from 'react'
import {Link} from "react-router-dom"
import Image from "../../assets/images/brand-icon.png"
import styled from "styled-components"
const Brand = ({className}) => {
  return (
    <Link to="/" className={className}>
      <img src={Image} alt="brand"/>
    </Link>
  )
}
export default styled(Brand)`
  display : flex ; 
  img{
    width : 80% ; 
    height : 80% ;  
    max-width : 46px;
    max-height : 46px;
    display : inline-block;
    margin: 0 auto;
  }
`
