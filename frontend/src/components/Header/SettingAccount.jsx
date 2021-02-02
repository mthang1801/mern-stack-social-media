import React from 'react'
import styled from "styled-components"
import Avatar from "../../assets/images/mvt-icon.png"
import Button from "../Controls/ButtonHeader"
const SettingAccount = () => {
  return (
    <div>
      <Button>
        <img src={Avatar}/>
      </Button>      
    </div>
  )
}

export default SettingAccount
