import React, {useState} from 'react'
import {MessageItemWrapper, Avatar, UserMessageOverview, MessageControls} from "./styles/MessageItem.styles"
import {LazyLoadImage} from "react-lazy-load-image-component"
import Moment from "react-moment"
import {BsThreeDots} from "react-icons/bs"
import {useThemeUI} from "theme-ui"
const MessageItem = ({message}) => {
  const [showSetting, setShowSettings] = useState(false);

  const {colorMode} = useThemeUI()
  console.log(showSetting)
  return (
    <MessageItemWrapper theme={colorMode}>
      <Avatar>
        <LazyLoadImage src={message.avatar}/>
      </Avatar>
      <UserMessageOverview>
        <h4>{message.name}</h4>
        <span>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga fugit, eius natus iure libero reprehenderit velit sequi sint molestiae omnis".slice(0,20)+"..."}</span>        
      </UserMessageOverview>
      <MessageControls show={showSetting} onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}>
        <Moment date={new Date()} format={"DD/MM/YYYY"} />   
        <span ><BsThreeDots/></span>     
      </MessageControls>
    </MessageItemWrapper>
  )
}

export default MessageItem
