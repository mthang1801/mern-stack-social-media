import React, {useState, useEffect} from "react";
import {
  Wrapper
} from "./styles/ChatBoard.styles";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_CURRENT_CHAT_USER } from "../../apollo/operations/queries/cache";
import ChatBoardHeading from "./ChatBoardHeading"
import ChatBoardBody from "./ChatBoardBody"
import ChatBoardFooter from "./ChatBoardFooter"

const ChatCenter = () => {  
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});  
  const {
    data: { currentChatUser },
  } = useQuery(GET_CURRENT_CHAT_USER, {fetchPolicy : "cache-first"});  
  
  
  useEffect(() => {},[])
  if (!user && !currentChatUser) return null;
  return (
    <Wrapper>
      <ChatBoardHeading/>
      <ChatBoardBody/>
      <ChatBoardFooter/>
    </Wrapper>
  );
};

export default ChatCenter;
