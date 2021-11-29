import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  Wrapper,
  DraftEditor,
  Toolbar,
  Label,
  CardPreview,
} from './styles/PostEditorBody.styles';
import { ReactTinyLink } from 'react-tiny-link';
import Editor from '@draft-js-plugins/editor';
import useDraftEditorPlugin from '../useDraftEditorPlugin';
import { IoIosImage } from 'react-icons/io';
import generateBase64Image from '../../../utils/generateBase64Image';
import ImagesCarousel from '../../UI/ImagesCarousel';
import { useQuery } from '@apollo/client';
import { SEARCH_FRIENDS } from '../../../apollo/user/user.types';
import useLocale from '../../../locales';
const PostEditorBody = ({
  editorState,
  setEditorState,
  images,
  setImages,
  isEdited,
  postEdited,
}) => {
  const [urlPreview, setUrlPreview] = useState(null);
  const editorRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [openMention, setOpenMention] = useState(true);
  const { refetch: searchFriends, loading: searchFriendsLoading } = useQuery(
    SEARCH_FRIENDS,
    { fetchPolicy: 'network-only', skip: true }
  );
  const {
    translation: { postPlaceholder },
  } = useLocale();

  const { plugins, MentionSuggestions, EmojiSelect, EmojiSuggestions } =
    useDraftEditorPlugin();

  const onOpenChange = useCallback((_open) => setOpenMention(_open), []);
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

  useEffect(() => {
    let elementId;
    if (isEdited && postEdited) {
      elementId = `edited-post-body-${postEdited._id}`;
    } else {
      elementId = 'post-editor-body';
    }
    let urlLength;

    urlLength = document
      .getElementById(elementId)
      .querySelectorAll('[aria-label=link]').length;

    if (urlLength) {
      const url = document
        .getElementById(elementId)
        .querySelectorAll('[aria-label=link]')
        [urlLength - 1].getAttribute('href');
      setUrlPreview(url);
    } else {
      setUrlPreview(null);
    }
  }, [editorState]);

  const onChangeImages = async (e) => {
    const length = e.target.files.length;
    const fileData = e.target.files;
    const matches = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];
    let listImages = [];
    for (let i = 0; i < length; i++) {
      if (!matches.includes(fileData[i].type)) {
        alert('invalid image');
        return;
      }
      listImages.push(fileData[i]);
    }

    let base64Images = [];
    for (let image of listImages) {
      const base64ImageItem = await generateBase64Image(image);
      base64Images = [...base64Images, { ...base64ImageItem }];
    }
    if (base64Images.length) {
      setImages([...base64Images]);
    }
  };

  return (
    <>
      <DraftEditor
        onClick={() => editorRef.current?.focus()}
        id={
          isEdited ? `edited-post-body-${postEdited._id}` : 'post-editor-body'
        }
        style={{ alignItems: 'flex-start' }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          tabIndex={0}
          placeholder={"What's on your mind?"}
        />
        <MentionSuggestions
          open={openMention}
          onOpenChange={onOpenChange}
          onSearchChange={onSearchChange}
          suggestions={suggestions}
        />
        <EmojiSuggestions />
      </DraftEditor>
      {urlPreview && (
        <CardPreview>
          <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            maxLine={3}
            minLine={1}
            url={urlPreview}
            proxyUrl="https://cors-anywhere.herokuapp.com"
          />
        </CardPreview>
      )}
      {images.length ? <ImagesCarousel images={images} /> : null}
      <Toolbar>
        <EmojiSelect />
        <Label htmlFor="post-images" name="post-images">
          <IoIosImage />
          <input
            type="file"
            multiple={true}
            name="post-images"
            id="post-images"
            onChange={onChangeImages}
          />
        </Label>
      </Toolbar>
    </>
  );
};

export default React.memo(PostEditorBody);
