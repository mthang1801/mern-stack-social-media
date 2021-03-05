import React from 'react'
import {Wrapper, User, Avatar,UserInfo, Controls, LinkItem } from "./styles/ChatBoardHeading.styles"
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../../apollo/operations/queries/cache";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {MdLocalPhone} from "react-icons/md";
import {BsCameraVideo} from "react-icons/bs";
import {FaPhotoVideo, FaRegFileAlt} from "react-icons/fa";
const ChatBoardHeading = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER);
  if (!user) return null;
  return (
    <Wrapper>
        <User>
          <Avatar>
            <LazyLoadImage src={user.avatar} alt={user.avatar} />
          </Avatar>
          <UserInfo>
            <h4>{user.name}</h4>
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
