import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import draftToHtml from "draftjs-to-html"
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
import { CREATE_COMMENT } from "../../apollo/operations/mutations/post/createComment";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { Link } from "react-router-dom";
const CommentEditor = ({ post }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [openMention, setOpenMention] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const {
    refetch: searchFriends,
    loading: searchFriendsLoading,
  } = useQuery(SEARCH_FRIENDS, { fetchPolicy: "network-only", skip: true });
  const [createComment] = useMutation(CREATE_COMMENT);
  const { addCommentToPost } = cacheMutations;
  const { push } = useHistory();
  const { colorMode } = useThemeUI();
  const onOpenChange = useCallback((_open) => setOpenMention(_open), []);
  const [showControls, setShowControls] = useState(false);
  const controlsRef = useRef(null);
  const commentRef = useRef(null);
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

  useEffect(() => {
    function trackUserClickCommentControls(e) {
      if (
        commentRef.current &&
        !commentRef.current.contains(e.target) &&
        showControls
      ) {
        setShowControls(false);
      }
    }
    window.addEventListener("click", trackUserClickCommentControls);

    return () =>
      window.removeEventListener("click", trackUserClickCommentControls);
  }, [commentRef, showControls]);

  const onSubmitComment = (e) => {
    if (e.which === 13 && editorState.getCurrentContent().hasText() && !openMention) {
      const rawEditorState = convertToRaw(editorState.getCurrentContent());
      const shortenText = draftToHtml(rawEditorState).split("</p>")[0].replace(/<p>|&nbsp;/g, "");    
      document
        .querySelector(`[data-target=comment-input-${post._id}]`)
        .querySelector("[contenteditable=true]")
        ?.setAttribute("contenteditable", false);
      const textData = document.querySelector(
        `[data-target=comment-input-${post._id}]`
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
        createComment({
          variables: { postId: post._id, text: textData, shortenText, mentions: mentions },
        })
          .then(({ data }) => {
            document
              .querySelector(`[data-target=comment-input-${post._id}]`)
              .querySelector("[contenteditable=false]")
              ?.setAttribute("contenteditable", true);
              
            const {createComment} = data;
            addCommentToPost(post._id, createComment);
          })
          .catch((err) => {          
            document
              .querySelector(`[data-target=comment-input-${post._id}]`)
              .querySelector("[contenteditable=true]")
              ?.setAttribute("contenteditable", true);
          });
      }
    }
  };

  useEffect(() => {
    let timer ;
    timer = setTimeout(() => {
      editorRef.current?.focus();
    },100)
    return () => clearTimeout(timer);
  },[])
  return (
    <Wrapper ref={commentRef}>
      <CommentInput
        theme={colorMode}
        onClick={() => {
          editorRef.current?.focus();
          setShowControls(true);
        }}
        onKeyDown={onSubmitComment}
        data-target={`comment-input-${post._id}`}
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
        {/* <InputImage htmlFor={`comment-image-${post._id}`}>
          <input type="file" name="comment-image" id={`comment-image-${post._id}`}/>  
          <BiImageAlt/>
        </InputImage>         */}
      </CommentControls>
    </Wrapper>
  );
};

export default React.memo(CommentEditor);
