import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  ChatInput,
  ChatActions,
  Label,
  EmojiComponent,
} from "./styles/ChatBoardFooter.styles";
import "emoji-mart/css/emoji-mart.css";
import ContentEditable from "react-contenteditable";
import { Picker } from "emoji-mart";
import { FiSmile } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import sanitizeHtml from "sanitize-html";
import { useThemeUI } from "theme-ui";
import linkify from "linkify-it";
import $ from "jquery";
import linkifyHtml from "linkifyjs/html";
import CaretPositioning from "../../utils/EditCaretPositioning"

const ChatBoardFooter = () => {
  const [html, setHtml] = useState(`<div></div>`); 
  const [show, setShow] = useState(null);  
  const [caretPos, setCaretPos] = useState({start : 0,  end: 0});
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

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "div", "h1"],
    allowedAttributes: { a: ["href", "name", "data-*"] },
    allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
    allowedSchemesByTag: {},
    selfClosing: [
      "img",
      "br",
      "hr",
      "area",
      "base",
      "basefont",
      "input",
      "link",
      "meta",
    ],
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
  };

  const sanitize = () => {
    setHtml((prevHtml) => sanitizeHtml(prevHtml, sanitizeConf));
  };

  const handleChangeHtml = (e) => {
    let formatHTML = e.target.innerHTML.replace(
      /&nbsp;/g,
      "<span>&nbsp;</span>"
    );
    setHtml(linkifyHtml(formatHTML, { defaultProtocol: "https" }));
  };

  const onChangeHandler = (e) => {   
    let targetValue =  e.currentTarget.textContent;
    //save caret position(s), so can restore when component reloads
    let savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);    
    setCaretPos(savedCaretPosition)
  }
console.log(caretPos)

  useEffect(() => {
    if ($("#input-chat").length) {
      $("#input-chat")
        .contents()
        .eq("0")
        .filter(function () {
          return this.nodeType != 1;
        })
        .wrap("<div />");      
      
    }
  });

  return (
    <Wrapper>
      <ChatInput>
        <ContentEditable
          tagName="div"
          html={html}
          onKeyUp={handleChangeHtml}
          onBlur={sanitize}
          innerRef={inputRef}
          id="input-chat"
          suppressContentEditableWarning={true}
          className="input-chat"
          onInput={onChangeHandler}
        />
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
