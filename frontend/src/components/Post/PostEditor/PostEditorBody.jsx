import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  Wrapper,
  DraftEditor,
  Toolbar,
  Label,
  CardPreview,
  HashtagLink,
  LinkAnchor,
} from "./styles/PostEditorBody.styles";
import { ReactTinyLink } from "react-tiny-link";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import { IoIosImage } from "react-icons/io";
import generateBase64Image from "../../../utils/generateBase64Image";
import ImagesCarousel from "../../UI/ImagesCarousel";
import { useQuery } from "@apollo/client";
import { SEARCH_FRIENDS } from "../../../apollo/operations/queries/user";
import { useHistory } from "react-router-dom";
import useLanguage from "../../Global/useLanguage";
const PostEditorBody = ({ editorState, setEditorState, images, setImages }) => {
  const [urlPreview, setUrlPreview] = useState(null);
  const editorRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [openMention, setOpenMention] = useState(true);
  const {
    refetch: searchFriends,
    loading: searchFriendsLoading,
  } = useQuery(SEARCH_FRIENDS, { fetchPolicy: "network-only", skip: true });
  const { push } = useHistory();
  const { i18n, lang } = useLanguage();
  const { postPlaceholder } = i18n.store.data[lang].translation.post;
  // useMemo plugins
  const {
    plugins,
    MentionSuggestions,
    EmojiSelect,
    EmojiSuggestions,
  } = useMemo(() => {
    // Emoji
    const emojiPlugin = createEmojiPlugin({
      selectButtonContent: "😀",
    });
    const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
    // Linkify
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
      rel: "noopener noreferrer",
      component(props) {
        return (
          <LinkAnchor {...props} aria-label="link" />
        );
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
            href={`${
              window.location.href
            }search?q=${props.decoratedText.replace(/#/g, "")}`}
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
    const urlLength = document
      .getElementById("post-editor")
      .querySelectorAll("[aria-label=link]").length;
    
    if (urlLength) {
      const url = document
        .getElementById("post-editor")
        .querySelectorAll("[aria-label=link]")
        [urlLength - 1].getAttribute("href");
      setUrlPreview(url);
    } else {
      setUrlPreview(null);
    }
  }, [editorState]);

  const onChangeImages = async (e) => {
    const length = e.target.files.length;
    const fileData = e.target.files;
    const matches = ["image/png", "image/gif", "image/jpg", "image/jpeg"];
    let listImages = [];
    for (let i = 0; i < length; i++) {
      if (!matches.includes(fileData[i].type)) {
        alert("invalid image");
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
        id="post-editor"
        style={{ alignItems: "flex-start" }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          tabIndex={0}
          placeholder={postPlaceholder}
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
