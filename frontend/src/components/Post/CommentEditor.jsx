import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import { useQuery } from "@apollo/client";
import { SEARCH_FRIENDS } from "../../apollo/operations/queries/user";
import {
  HashtagLink,
  Wrapper,
  LinkAnchor,
} from "./PostEditor/styles/PostEditorBody.styles";
import { useHistory } from "react-router-dom";
import { CommentInput, CommentControls } from "./styles/CommentEditor.styles";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
const CommentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [openMention, setOpenMention] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const {
    refetch: searchFriends,
    loading: searchFriendsLoading,
  } = useQuery(SEARCH_FRIENDS, { fetchPolicy: "network-only", skip: true });
  const { push } = useHistory();
  const { colorMode } = useThemeUI();
  const onOpenChange = useCallback((_open) => setOpenMention(_open), []);
  const [showControls, setShowControls] = useState(false);
  const controlsRef = useRef(null);
  const commentRef = useRef(null);
  const editorRef = useRef(null);
  const { i18n, lang } = useLanguage();
  const { commentInputPlaceholder } = i18n.store.data[lang].translation.post;
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
        return <LinkAnchor {...props} />;
      },
    });
    // Mention
    const mentionPlugin = createMentionPlugin({
      mentionComponent(mentionProps) {
        return (
          <span
            className={mentionProps.className}
            onClick={() => push(`/${mentionProps.mention.slug}`)}
          >
            {mentionProps.children}
          </span>
        );
      },
    });
    const hashTagPlugin = createHashTagPlugin({
      hashtagComponent(props) {
        return (
          <HashtagLink
            onClick={() =>
              push(`/search?q=${props.decoratedText.replace(/#/g, "")}`)
            }
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
  }, [commentRef,showControls]);

  return (
    <Wrapper ref={commentRef}>
      <CommentInput
        theme={colorMode}
        onClick={() => {
          editorRef.current?.focus();
          setShowControls(true);
        }}
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

export default React.memo(CommentEditor);
