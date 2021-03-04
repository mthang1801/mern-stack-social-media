import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  ChatInput,
  ChatActions,
  Label,
  EmojiComponent,
} from "./styles/ChatBoardFooter.styles";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { FiSmile } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useThemeUI } from "theme-ui";


const ChatBoardFooter = () => {
  const [html, setHtml] = useState(`<div></div>`); 
  const [show, setShow] = useState(null);   
  const [hydratedValue, setHydratedValue] = useState(null)
  const { colorMode } = useThemeUI();
  const emojiRef = useRef(null);
  const inputRef = useRef(null);
  const handleSelectEmoji = (emoji) => {  
    // const chatBox = document.getElementById("input-chat");
    // chatBox.focus()
    // pasteHtmlAtCaret(`<b>${emoji.native}</b>`)
  };
  const onClickEmoji = (e) => {
    e.stopPropagation();
    if (show === "emoji") {
      setShow(null);
    } else {
      setShow("emoji");
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        show === "emoji"
      ) {
        setShow(null);
      }
    });
    return () =>
      window.removeEventListener("click", (e) => {
        if (
          emojiRef.current &&
          !emojiRef.current.contains(e.target) &&
          show === "emoji"
        ) {
          setShow(null);
        }
      });
  });

  const _handleSynchronizedChange = synchronizedContent => {
    console.log(synchronizedContent)
    setHydratedValue(synchronizedContent);
  }

  return (
    <Wrapper>
      <ChatInput>
     
      </ChatInput>
      <div id="caretPos"></div>
      <ChatActions>
        <Label ref={emojiRef} style={{ color: "#2e7d32" }}>
          <FiSmile onClick={onClickEmoji} />
          <EmojiComponent show={show === "emoji"}>
            <Picker
              theme={colorMode}
              onSelect={handleSelectEmoji}
              showPreview={false}
              showSkinTones={false}              
              emojiTooltip={true}
            />
          </EmojiComponent>
        </Label>
        <Label htmlFor="chat-photo" style={{ color: "#fb8c00" }}>
          <HiOutlinePhotograph />
          <input type="file" id="chat-photo" name="chat-photo" />
        </Label>
        <Label htmlFor="chat-attachment" style={{ color: "#4527a0 " }}>
          <IoMdAttach />
          <input type="file" id="chat-attachment" name="chat-attachment" />
        </Label>
      </ChatActions>
    </Wrapper>
  );
};

export default ChatBoardFooter;
