import React, {useState, useEffect} from "react";
import {
  Wrapper
} from "./styles/ChatBoard.styles";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_CURRENT_CHAT } from "../../apollo/operations/queries/cache";
import ChatBoardHeading from "./ChatBoardHeading"
import ChatBoardBody from "./ChatBoardBody"
import ChatBoardFooter from "./ChatBoardFooter"

const ChatCenter = () => {  
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});  
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, {fetchPolicy : "cache-first"});  
  
  
  useEffect(() => {},[])
  if (!user && !currentChat) return null;
  return (
    <Wrapper>
      <ChatBoardHeading/>
      <ChatBoardBody/>
      <ChatBoardFooter/>
    </Wrapper>
  );
};

export default ChatCenter;
