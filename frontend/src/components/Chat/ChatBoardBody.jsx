import React, { useState, useEffect, createRef } from "react";
import { Wrapper } from "./styles/ChatBoardBody.styles";
import Bubble from "./Bubble";
import { useThemeUI } from "theme-ui";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_CHAT,
  GET_MESSAGES_STORAGE,
  GET_CURRENT_USER,
} from "../../apollo/operations/queries/cache";


const ChatBoardBody = () => {
  
  //useQuery
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-first" });
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  const chatBoardBodyRef = createRef(null)
  useEffect(() => {    
    let timer ;
    timer = setTimeout(()=>{     
      if(chatBoardBodyRef.current){
        chatBoardBodyRef.current.scrollIntoView({          
          behavior : "auto"
        })
      }      
    },10)
    return () => clearTimeout(timer);
  })    
  const { colorMode } = useThemeUI();  
  return (
    <Wrapper theme={colorMode} id="body-board" >     
      {currentChat && messagesStorage[currentChat._id] &&  messagesStorage[currentChat._id].messages.length && user
        ? messagesStorage[currentChat._id].messages.map((message, idx) => {              
            return (
              <Bubble
                key={message._id}
                message={message}
                me={message.sender._id === user._id}
                senderAvatar={
                  message.sender._id === user._id
                    ? user.avatar
                    : currentChat.avatar
                }
                index={idx}                
              />
            );
          })
        : null}   
        <div ref={chatBoardBodyRef}></div>
    </Wrapper>
  );
};

export default ChatBoardBody;
