import React from 'react'
import {Wrapper, AsideComponent, Main} from "./styles/MainBody.styles"
import Aside from "../components/Aside/Aside"
import {useThemeUI} from "theme-ui"
// This body used for home, notifications and global page
const MainBody = ({children}) => {
  const {colorMode} = useThemeUI()
  return (
    <Wrapper theme={colorMode}>
      <AsideComponent>
        <Aside/>
      </AsideComponent>
      <Main>
        {children}
      </Main>
    </Wrapper>
  )
}


export default MainBody
