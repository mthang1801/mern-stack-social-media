import React from 'react'
import {Wrapper, User, Avatar,UserInfo, Controls, LinkItem } from "./styles/ChatBoardHeading.styles"
import { useReactiveVar } from "@apollo/client";
import { currentChatVar } from "../../apollo/cache";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {MdLocalPhone} from "react-icons/md";
import {BsCameraVideo} from "react-icons/bs";
import {FaPhotoVideo, FaRegFileAlt} from "react-icons/fa";
import Moment from "react-moment"
const ChatBoardHeading = () => {
  const currentChat = useReactiveVar(currentChatVar);
  
  if (!currentChat || !Object.keys(currentChat).length) return null;
  return (
    <Wrapper>
        <User>
          <Avatar>
            <LazyLoadImage src={currentChat.avatar} alt={currentChat.avatar} />
          </Avatar>
          <UserInfo>
            <h4>{currentChat.name}</h4>
            <small>{currentChat.isOnline ? "Current Online" :currentChat.offlinedAt ? <Moment fromNow>{new Date(+currentChat.offlinedAt)}</Moment> : null}</small>
          </UserInfo>
        </User>
        <Controls>
          <LinkItem phone><MdLocalPhone/></LinkItem>
          <LinkItem video><BsCameraVideo/></LinkItem>
          <LinkItem photo><FaPhotoVideo/></LinkItem>
          <LinkItem file><FaRegFileAlt/></LinkItem>
        </Controls>
      </Wrapper>
  )
}

export default ChatBoardHeading
