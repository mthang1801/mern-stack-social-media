import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Wrapper,
  ChatInput,
  ChatActions,
  Label,
  SendMessage,
} from "./styles/ChatBoardFooter.styles";
import "emoji-mart/css/emoji-mart.css";
import { FiSend } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import { useThemeUI } from "theme-ui";
import {
  SEND_MESSAGE_CHAT_TEXT,
  SEND_MESSAGE_CHAT_FILE,
} from "../../apollo/operations/mutations/chat";
import { cacheMutations } from "../../apollo/operations/mutations/";
import {
  GET_CURRENT_CHAT,
  GET_CURRENT_USER,
} from "../../apollo/operations/queries/cache";
import { useMutation, useQuery } from "@apollo/client";
import generateBase64Image from "../../utils/generateBase64Image";
import useLanguage from "../Global/useLanguage"
const ChatBoardFooter = () => {
  //useState
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );  
  const { colorMode } = useThemeUI();
  const [suggestions, setSuggestions] = useState(mentions);
  const [open, setOpen] = useState(true);
  const {i18n, lang} = useLanguage();
  const {chatInputPlaceholder} = i18n.store.data[lang].translation.chat;
  //useQuery
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-and-network" });
  //useMutation
  const [sendMessageChatText] = useMutation(SEND_MESSAGE_CHAT_TEXT);
  const [sendMessageChatFile] = useMutation(SEND_MESSAGE_CHAT_FILE);
  const { setMessagesStorage } = cacheMutations;
  const editorRef = useRef(null);

  const {
    plugins,
    EmojiSelect,
    EmojiSuggestions,
    MentionSuggestions,
  } = useMemo(() => {
    const emojiPlugin = createEmojiPlugin({
      selectButtonContent: "😀",
    });
    const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
      rel: "noopener noreferrer",
      component(props) {
        return <a {...props} onClick={() => alert("Clicked on Link!")} />;
      },
    });
    const mentionPlugin = createMentionPlugin({
      positionSuggestions: (settings) => {
        return {
          left: `${settings.decoratorRect.left - 360 + 30}px`,
          top: `${-settings.decoratorRect.height * 5 - 100}px`,
          display: "block",
          transform: "scale(1)", // transition popover on the value of its height
          transformOrigin: "1em 0% 0px",
          transition: "all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)",
        };
      },
      mentionComponent(mentionProps) {
        return (
          <span
            className={mentionProps.className}
            onClick={() => alert("CLick mentions")}
          >
            {mentionProps.children}
          </span>
        );
      },
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin, emojiPlugin, linkifyPlugin];
    return { plugins, EmojiSelect, EmojiSuggestions, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => setOpen(_open), []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);


  useEffect(() => {
    function focusEditorWhenTypingTabButton(e) {
      if (e.which === 9) {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }
    }
    window.addEventListener("keyup", (e) => {
      focusEditorWhenTypingTabButton(e);
    });
    return () =>
      window.removeEventListener("keyup", (e) => {
        focusEditorWhenTypingTabButton(e);
      });
  }, [editorRef]);
  const onSendMessage = (e) => {    
    if (editorState.getCurrentContent().hasText() && currentChat) {
      const rawData = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      sendMessageChatText({
        variables: {
          receiverId: currentChat._id,
          text: rawData,
          scope: currentChat.scope || "PERSONAL",
        },
      })
        .then(({ data }) => {
          const { message, scope } = data.sendMessageChatText;
          const { receiver } = message;
          console.log(receiver)
          //always set hasSeenLatestMessage is true  because  this user is sender
          setMessagesStorage(receiver, message, scope, true);
          setEditorState(EditorState.createEmpty());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChangeInputChatImage = async (e) => {
    const fileData = e.target.files[0];
    const maxSize = 1024 * 1024;
    if (fileData && fileData.size > maxSize) {
      return false;
    }
    const validFiles = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!validFiles.includes(fileData.type)) {
      return false;
    }
    const {
      src: encoding,
      name: filename,
      mimetype,
    } = await generateBase64Image(fileData);

    if (currentChat) {
      const { data } = await sendMessageChatFile({
        variables: {
          receiverId: currentChat._id,
          encoding,
          filename,
          mimetype,
          scope: currentChat.scope,
          messageType: "IMAGE",
        },
      });
      const { message, scope } = data.sendMessageChatFile;
      const messenger = message.receiver;
      setMessagesStorage(messenger, message, scope, true);
      document.getElementById("chat-image").value =  "";
    }
  };

  const onChangeInputChatAttachment = async (e) => {    
    e.preventDefault();
    const fileData = e.target.files[0];
    const maxSize = 1024 * 1024 * 5;
    if (fileData && fileData.size > maxSize) {
      console.log("oversize");
      return false;
    }
    const validExtensions = new RegExp("(.*?).(docx|doc|pdf|xml|bmp|ppt|xls|txt)$");
    if (!validExtensions.test(e.target.value.toLowerCase())) {
      console.log("invalid file")
      return false;
    }
    const {
      src: encoding,
      name: filename,
      mimetype,
    } = await generateBase64Image(fileData); 
         
    if (currentChat) {
      const { data } = await sendMessageChatFile({
        variables: {
          receiverId: currentChat._id,
          encoding,
          filename,
          mimetype,
          scope: currentChat.scope,
          messageType: "ATTACHMENT",
        },
      });
      const { message, scope, error } = data.sendMessageChatFile;
      if(error){
        console.log(error)
        return ;
      }
      const messenger = message.receiver;
      setMessagesStorage(messenger, message, scope, true);
    }
    document.getElementById("chat-attachment").value =  "";
  };
  return (
    <Wrapper style={{ display: !user || !currentChat || !Object.entries(currentChat).length ? "none" : "block" }}>
      <ChatActions theme={colorMode}>
        <Label htmlFor="chat-image" style={{ color: "#fb8c00" }}>
          <HiOutlinePhotograph />
          <input
            type="file"
            id="chat-image"
            name="chat-image"
            onChange={onChangeInputChatImage}
          />
        </Label>
        <Label htmlFor="chat-attachment" style={{ color: "#4527a0 " }}>
          <IoMdAttach />
          <input
            type="file"
            id="chat-attachment"
            name="chat-attachment"
            onChange={onChangeInputChatAttachment}            
          />
        </Label>
      </ChatActions>
      <ChatInput onClick={() => editorRef.current?.focus()}>
        <EmojiSuggestions />
        <EmojiSelect />
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          tabIndex="0"          
          placeholder={`${chatInputPlaceholder} ${currentChat?.name}`}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          onSearchChange={onSearchChange}
          suggestions={suggestions}
        />       
        <SendMessage onClick={onSendMessage}>
          <FiSend />
        </SendMessage>
      </ChatInput>
    </Wrapper>
  );
};

const mentions = [
  {
    id: 1,
    name: "Matthewwqeeqs Russell",
    email: "matthew.russell@google.com",
    slug: "matthew",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 1230,
    name: "Juliasadaw Krispel-Samsel",
    slug: "juliansadaw",
    email: "julian.krispel@google.com",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 66,
    name: "Jyotiewq Puri",
    slug: "jyoti",
    email: "jyoti@yahoo.com",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    id: 905,
    name: "Maxcxzc Stoiber",
    slug: "stoiber",
    email: "max.stoiber@university.edu",
    avatar:
      "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg",
  },
  {
    id: 54111,
    name: "Nikeq Graf",
    slug: "graf",
    email: "info@nik-graf.com",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    id: 22,
    name: "Pascalewq Brandt",
    slug: "brandt",
    email: "pascalbrandt@fastmail.com",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 3216361,
    name: "Matthewewqeq Russell",
    slug: "russell",
    email: "matthew.russell@google.com",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 192365,
    name: "Julianewqeq Krispel-Samsel",
    slug: "julianewqeq",
    email: "julian.krispel@google.com",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 23648,
    name: "Jyotiewqeqw Puri",
    slug: "puti",
    email: "jyoti@yahoo.com",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
];

export default ChatBoardFooter;
