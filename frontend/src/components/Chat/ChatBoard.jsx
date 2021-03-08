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

  return (
    <Wrapper>
      <ChatBoardHeading/>
      <ChatBoardBody/>
      <ChatBoardFooter/>
    </Wrapper>
  );
};

export default ChatCenter;
