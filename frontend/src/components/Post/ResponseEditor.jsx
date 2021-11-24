import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';
import { useQuery, useMutation } from '@apollo/client';
import useDraftEditorPlugin from './useDraftEditorPlugin';
import { SEARCH_FRIENDS } from '../../apollo/user/user.types';
import { Wrapper } from './PostEditor/styles/PostEditorBody.styles';
import { CommentInput, CommentControls } from './styles/CommentEditor.styles';
import { useThemeUI } from 'theme-ui';
import useLanguage from '../Global/useLanguage';
import { CREATE_RESPONSE } from '../../apollo/post/post.types';
import { addNewResponseToComment } from '../../apollo/post/post.caches';
const CommentEditor = ({
  comment,
  response,
  user,
  dataResponse,
  focus,
  removeFocus,
}) => {
  const [editorState, setEditorState] = useState(() =>
    comment.author._id === user._id || !dataResponse
      ? EditorState.createEmpty()
      : EditorState.createWithContent(convertFromRaw(JSON.parse(dataResponse)))
  );

  useEffect(() => {
    let timer;
    if (focus) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const rawData = convertToRaw(editorState.getCurrentContent());
        if (!dataResponse) return;
        const parseDataResponse = JSON.parse(dataResponse);
        if (
          rawData.blocks[0].text.indexOf(parseDataResponse.blocks[0].text) ===
            -1 &&
          rawData.blocks[0].text
            .toLowerCase()
            .indexOf(user.name.toLowerCase()) === -1 &&
          response.author._id !== user._id
        ) {
          parseDataResponse.blocks[0] = {
            ...parseDataResponse.blocks[0],
            text: `${parseDataResponse.blocks[0].text} ${rawData.blocks[0].text}`,
          };
          rawData.blocks = [
            { ...parseDataResponse.blocks[0] },
            ...rawData.blocks.filter((_, idx) => idx !== 0),
          ];
          let entityIndex = Object.keys(rawData.entityMap).length;
          rawData.entityMap[entityIndex] = {
            ...parseDataResponse.entityMap[0],
          };
          setEditorState(
            EditorState.createWithContent(convertFromRaw(rawData))
          );
        }
      }, 66);
    }
  }, [focus, editorState, response, dataResponse]);

  const [openMention, setOpenMention] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { refetch: searchFriends } = useQuery(SEARCH_FRIENDS, {
    fetchPolicy: 'network-only',
    skip: true,
  });
  const [createResponse] = useMutation(CREATE_RESPONSE);
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
  const { plugins, MentionSuggestions, EmojiSelect, EmojiSuggestions } =
    useDraftEditorPlugin();

  useEffect(() => {
    let timer;
    if (focus) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        editorRef.current.focus();
        removeFocus();
      }, 66);
    }
    return () => clearTimeout(timer);
  }, [focus]);

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
    window.addEventListener('click', trackUserClickCommentControls);

    return () =>
      window.removeEventListener('click', trackUserClickCommentControls);
  }, [responseRef, showControls]);

  const onSubmitComment = (e) => {
    if (
      e.which === 13 &&
      !openMention &&
      !document
        .querySelector(`[data-target=response-input-${comment._id}]`)
        ?.getElementsByClassName(`esyutjr`)?.length
    ) {
      if (e.shiftKey) {
        return;
      }
      let rawEditorState = convertToRaw(editorState.getCurrentContent());
      const filterBlockEmpty = rawEditorState.blocks.filter(
        (block) => block.text
      );
      rawEditorState = { ...rawEditorState, blocks: [...filterBlockEmpty] };

      const rawText = JSON.stringify(rawEditorState);
      const shortenText = draftToHtml(rawEditorState)
        .split('</p>')[0]
        .replace(/<p>|&nbsp;/g, '');
      document
        .querySelector(`[data-target=response-input-${comment._id}]`)
        .querySelector('[contenteditable=true]')
        ?.setAttribute('contenteditable', false);
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
      mentions = _.unionBy(mentions, '_id').map((mention) =>
        mention._id.toString()
      );

      if (rawEditorState.blocks?.length) {
        setEditorState(EditorState.createEmpty());
        createResponse({
          variables: {
            commentId: comment._id,
            text: textData,
            shortenText,
            rawText,
            mentions,
          },
        })
          .then(({ data }) => {
            document
              .querySelector(`[data-target=response-input-${comment._id}]`)
              .querySelector('[contenteditable=false]')
              ?.setAttribute('contenteditable', true);

            const { createResponse } = data;
            addNewResponseToComment(comment.post, comment._id, createResponse);
          })
          .catch((err) => {
            document
              .querySelector(`[data-target=response-input-${comment._id}]`)
              .querySelector('[contenteditable=true]')
              ?.setAttribute('contenteditable', true);
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

export default React.memo(CommentEditor);
