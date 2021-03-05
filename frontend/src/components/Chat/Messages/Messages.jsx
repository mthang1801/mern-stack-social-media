import React from 'react'
import {Wrapper, LeftSide, RightSide} from "./styles/Chat.styles"
import {GET_CURRENT_USER} from "../../../apollo/operations/queries/cache"
import {useQuery} from "@apollo/client"
import Search from "./Search"
import ListMessages from "./ListMessages";
import {useThemeUI} from "theme-ui"
import ChatBoard from "./ChatBoard"
const Messages = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});  
  const {colorMode} = useThemeUI()
  console.log("render")
  if(!user) return null;
  return (
    <Wrapper theme={colorMode}>
      <LeftSide theme={colorMode}>
        <Search/>        
        <hr/>
        <ListMessages/>
      </LeftSide>
      <RightSide>
        <ChatBoard/>
      </RightSide>
    </Wrapper>
  )
}

export default Messages
