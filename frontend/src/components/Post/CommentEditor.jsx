import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_FRIENDS } from '../../apollo/user/user.types';
import { Wrapper } from './PostEditor/styles/PostEditorBody.styles';
import { useHistory } from 'react-router-dom';
import { CommentInput, CommentControls } from './styles/CommentEditor.styles';
import { useThemeUI } from 'theme-ui';
import useLanguage from '../Global/useLanguage';
import { CREATE_COMMENT } from '../../apollo/post/post.mutations';
import { addCommentToPost } from '../../apollo/post/post.caches';
import useDraftEditorPlugin from './useDraftEditorPlugin';
const CommentEditor = ({ post }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [openMention, setOpenMention] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { refetch: searchFriends, loading: searchFriendsLoading } = useQuery(
    SEARCH_FRIENDS,
    { fetchPolicy: 'network-only', skip: true }
  );
  const [createComment] = useMutation(CREATE_COMMENT);
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

  const { plugins, MentionSuggestions, EmojiSelect, EmojiSuggestions } =
    useDraftEditorPlugin();

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
    window.addEventListener('click', trackUserClickCommentControls);

    return () =>
      window.removeEventListener('click', trackUserClickCommentControls);
  }, [commentRef, showControls]);

  const onSubmitComment = (e) => {
    if (
      e.which === 13 &&
      editorState.getCurrentContent().hasText() &&
      !openMention &&
      !document
        .querySelector(`[data-target=comment-input-${post._id}]`)
        .querySelector('[role=listbox]')
    ) {
      const rawEditorState = convertToRaw(editorState.getCurrentContent());
      const rawText = JSON.stringify(rawEditorState);
      const shortenText = draftToHtml(rawEditorState)
        .split('</p>')[0]
        .replace(/<p>|&nbsp;/g, '');
      document
        .querySelector(`[data-target=comment-input-${post._id}]`)
        .querySelector('[contenteditable=true]')
        ?.setAttribute('contenteditable', false);
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
      mentions = _.unionBy(mentions, '_id').map((mention) =>
        mention._id.toString()
      );
      if (textData) {
        setEditorState(EditorState.createEmpty());
        createComment({
          variables: {
            postId: post._id,
            text: textData,
            shortenText,
            rawText,
            mentions: mentions,
          },
        })
          .then(({ data }) => {
            document
              .querySelector(`[data-target=comment-input-${post._id}]`)
              .querySelector('[contenteditable=false]')
              ?.setAttribute('contenteditable', true);

            const { createComment } = data;
            addCommentToPost(post._id, createComment);
          })
          .catch((err) => {
            document
              .querySelector(`[data-target=comment-input-${post._id}]`)
              .querySelector('[contenteditable=true]')
              ?.setAttribute('contenteditable', true);
          });
      }
    }
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      editorRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
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
