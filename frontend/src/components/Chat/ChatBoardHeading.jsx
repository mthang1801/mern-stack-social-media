import React from 'react'
import {Wrapper, User, Avatar,UserInfo, Controls, LinkItem } from "./styles/ChatBoardHeading.styles"
import { useQuery } from "@apollo/client";
import { GET_CURRENT_CHAT } from "../../apollo/operations/queries/cache";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {MdLocalPhone} from "react-icons/md";
import {BsCameraVideo} from "react-icons/bs";
import {FaPhotoVideo, FaRegFileAlt} from "react-icons/fa";
const ChatBoardHeading = () => {
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT);
  if (!currentChat) return null;
  return (
    <Wrapper>
        <User>
          <Avatar>
            <LazyLoadImage src={currentChat.avatar} alt={currentChat.avatar} />
          </Avatar>
          <UserInfo>
            <h4>{currentChat.name}</h4>
            <small>Current Online</small>
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
