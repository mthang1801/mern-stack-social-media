import React from "react";
import {
  Wrapper, 
  BodyBoard,
  FooterBoard, 
} from "./styles/ChatBoard.styles";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/operations/queries/cache";
import ChatBoardHeading from "./ChatBoardHeading"
import ChatBoardBody from "./ChatBoardBody"
import ChatBoardFooter from "./ChatBoardFooter"
const ChatCenter = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER);  
  if (!user) return null;
  return (
    <Wrapper>
      <ChatBoardHeading/>
      <ChatBoardBody/>
      <ChatBoardFooter/>
    </Wrapper>
  );
};

export default ChatCenter;
