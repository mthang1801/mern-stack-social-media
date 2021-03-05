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
  PlaceHolder,
} from "./styles/ChatBoardFooter.styles";
import "emoji-mart/css/emoji-mart.css";
import { FiSend } from "react-icons/fi";
import { EditorState } from "draft-js";
import { IoMdAttach } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "./styles/editor.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import { useThemeUI } from "theme-ui";

const ChatBoardFooter = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { colorMode } = useThemeUI();
  const [suggestions, setSuggestions] = useState(mentions);
  const [open, setOpen] = useState(true);
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
    const plugins = [linkifyPlugin, mentionPlugin, emojiPlugin];
    return { plugins, EmojiSelect, EmojiSuggestions, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => setOpen(_open), []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  useEffect(()=>{
    setShowPlaceholder(!editorState.getCurrentContent().hasText())
  },[editorState])

 
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
  return (
    <Wrapper>
      <ChatActions theme={colorMode}>
        <Label htmlFor="chat-photo" style={{ color: "#fb8c00" }}>
          <HiOutlinePhotograph />
          <input type="file" id="chat-photo" name="chat-photo" />
        </Label>
        <Label htmlFor="chat-attachment" style={{ color: "#4527a0 " }}>
          <IoMdAttach />
          <input type="file" id="chat-attachment" name="chat-attachment" />
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
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          onSearchChange={onSearchChange}
          suggestions={suggestions}
        />
        <PlaceHolder show={showPlaceholder}>Enter something</PlaceHolder>
        <SendMessage>
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
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 1230,
    name: "Juliasadaw Krispel-Samsel",
    email: "julian.krispel@google.com",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 66,
    name: "Jyotiewq Puri",
    email: "jyoti@yahoo.com",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    id: 905,
    name: "Maxcxzc Stoiber",
    email: "max.stoiber@university.edu",
    avatar:
      "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg",
  },
  {
    id: 54111,
    name: "Nikeq Graf",
    email: "info@nik-graf.com",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    id: 22,
    name: "Pascalewq Brandt",
    email: "pascalbrandt@fastmail.com",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 3216361,
    name: "Matthewewqeq Russell",
    email: "matthew.russell@google.com",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 192365,
    name: "Julianewqeq Krispel-Samsel",
    email: "julian.krispel@google.com",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 23648,
    name: "Jyotiewqeqw Puri",
    email: "jyoti@yahoo.com",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    id: 36812,
    name: "Maxewqeq Stoiber",
    email: "max.stoiber@university.edu",
    avatar:
      "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg",
  },
  {
    id: 789327,
    name: "Nikewqewqad Graf",
    email: "info@nik-graf.com",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    id: 32131,
    name: "Pascalsadwq Brandt",
    email: "pascalbrandt@fastmail.com",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 121312,
    name: "Matthewewqe Russell",
    email: "matthew.russell@google.com",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 125134,
    name: "Julianewq Krispel-Samsel",
    email: "julian.krispel@google.com",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 3213214,
    name: "Jyotiasd Puri",
    email: "jyoti@yahoo.com",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    id: 65361,
    name: "Maxewq Stoiber",
    email: "max.stoiber@university.edu",
    avatar:
      "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg",
  },
  {
    id: 5321,
    name: "Nikewq Graf",
    email: "info@nik-graf.com",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    id: 43,
    name: "Pascalewq Brandt",
    email: "pascalbrandt@fastmail.com",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
];

export default ChatBoardFooter;