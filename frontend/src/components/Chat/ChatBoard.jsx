import React, {createRef} from "react";
import {
  Wrapper
} from "./styles/ChatBoard.styles";

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
