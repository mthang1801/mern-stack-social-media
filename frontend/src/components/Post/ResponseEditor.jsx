import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import draftToHtml from "draftjs-to-html"
import createMentionPlugin from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/client";
import { SEARCH_FRIENDS } from "../../apollo/operations/queries/user";
import {
  HashtagLink,
  Wrapper,
  LinkAnchor,
} from "./PostEditor/styles/PostEditorBody.styles";
import { useHistory } from "react-router-dom";
import {
  CommentInput,
  CommentControls,
  InputImage,
} from "./styles/CommentEditor.styles";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { CREATE_RESPONSE } from "../../apollo/operations/mutations/post/createResponse";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import shortid  from 'shortid';
const CommentEditor = ({ comment, user, dataResponse, focus, removeFocus }) => {    
  const [editorState, setEditorState] = useState(() =>
    comment.author._id === user._id || !dataResponse ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse((dataResponse))))
  );
  const [openMention, setOpenMention] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const {
    refetch: searchFriends,    
  } = useQuery(SEARCH_FRIENDS, { fetchPolicy: "network-only", skip: true });
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const { addNewResponseToComment } = cacheMutations;  
  const { colorMode } = useThemeUI();
  const onOpenChange = useCallback((_open) => setOpenMention(_open), []);
  const [showControls, setShowControls] = useState(false);
  const controlsRef = useRef(null);
  const responseRef = useRef(null);
  const editorRef = useRef(null);
  const { i18n, lang } = useLanguage();
  const { commentInputPlaceholder } = i18n.store.data[lang].translation.comment;
  const onSearchChange = useCallback(({ value }) => {    
    if (value) {      
      searchFriends({ search: value }).then(({ data }) => {
        const { searchFriends } = data;
        setSuggestions([...searchFriends]);
      });
    } else {
      setSuggestions([]);
    }
  }, []);
  // useMemo plugins
  const {
    plugins,
    MentionSuggestions,
    EmojiSelect,
    EmojiSuggestions,
  } = useMemo(() => {
    // Emoji
    const emojiPlugin = createEmojiPlugin({
      selectButtonContent: "☺",
    });
    const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
    // Linkify
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
      rel: "noopener noreferrer",
      component(props) {
        return <LinkAnchor {...props} aria-label="link" />;
      },
    });   
    // Mention
    const mentionPlugin = createMentionPlugin({
      mentionComponent(mentionProps) {
        return (
          <a
            className={mentionProps.className}
            href={`${window.location.href}${mentionProps.mention.slug}`}
            aria-label="mention"
          >
            {mentionProps.children}
          </a>
        );
      },
    });
    const hashTagPlugin = createHashTagPlugin({
      hashtagComponent(props) {
        return (
          <HashtagLink
            to={`${window.location.href}search?q=${props.decoratedText.replace(
              /#/g,
              ""
            )}`}
            aria-label="hashtag"
          >
            {props.children}
          </HashtagLink>
        );
      },
    });
    const { MentionSuggestions } = mentionPlugin;
    // hashTag

    const plugins = [mentionPlugin, hashTagPlugin, emojiPlugin, linkifyPlugin];

    return { plugins, EmojiSelect, EmojiSuggestions, MentionSuggestions };
  }, []);

  useEffect(( ) => {
    let timer ; 
    console.log(focus)
    if(focus){
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        editorRef.current.focus();
        removeFocus();
      },66)
    }
    return () =>  clearTimeout(timer)
  }, [focus])
 
  useEffect(() => {
    function trackUserClickCommentControls(e) {
      if (
        responseRef.current &&
        !responseRef.current.contains(e.target) &&
        showControls
      ) {
        setShowControls(false);
      }
    }
    window.addEventListener("click", trackUserClickCommentControls);

    return () =>
      window.removeEventListener("click", trackUserClickCommentControls);
  }, [responseRef, showControls]);

  const onSubmitComment = (e) => {
    if (e.which === 13 && editorState.getCurrentContent().hasText()) {
     
      const rawEditorState = convertToRaw(editorState.getCurrentContent());
      const rawText = JSON.stringify(rawEditorState);
      const shortenText = draftToHtml(rawEditorState)
        .split("</p>")[0]
        .replace(/<p>|&nbsp;/g, "");
      document
        .querySelector(`[data-target=response-input-${comment._id}]`)
        .querySelector("[contenteditable=true]")
        ?.setAttribute("contenteditable", false);
      const textData = document.querySelector(
        `[data-target=response-input-${comment._id}]`
      ).innerHTML;
      let mentions = [];
      if (rawEditorState.entityMap) {
        Object.values(rawEditorState.entityMap).map(({ data }) => {
          if (data.mention) {
            mentions.push({ ...data.mention });
          }
        });
      }
      mentions = _.unionBy(mentions, "_id").map((mention) =>
        mention._id.toString()
      );
      if (textData) {
        setEditorState(EditorState.createEmpty());              
        createResponse({variables : {
          commentId : comment._id , text : textData, shortenText, rawText, mentions
        }})
          .then(({ data }) => {
            document
              .querySelector(`[data-target=response-input-${comment._id}]`)
              .querySelector("[contenteditable=false]")
              ?.setAttribute("contenteditable", true);
              
            const {createResponse} = data;                       
            addNewResponseToComment(comment.post, comment._id, createResponse)
          })
          .catch((err) => {            
            document
              .querySelector(`[data-target=response-input-${comment._id}]`)
              .querySelector("[contenteditable=true]")
              ?.setAttribute("contenteditable", true);
          });
      }
    }
  };
  return (
    <Wrapper ref={responseRef}>
      <CommentInput
        theme={colorMode}
        onClick={() => {
          editorRef.current?.focus();
          setShowControls(true);
        }}
        onKeyDown={onSubmitComment}
        data-target={`response-input-${comment._id}`}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          placeholder={commentInputPlaceholder}
          ref={editorRef}
        />
        <MentionSuggestions
          open={openMention}
          onOpenChange={onOpenChange}
          onSearchChange={onSearchChange}
          suggestions={suggestions}          
        />        
        <EmojiSuggestions />
      </CommentInput>
      <CommentControls
        ref={controlsRef}
        theme={colorMode}
        show={showControls}
        onClick={() => setShowControls(true)}
      >
        <EmojiSelect />     
      </CommentControls>
    </Wrapper>
  );
};

export default CommentEditor;
