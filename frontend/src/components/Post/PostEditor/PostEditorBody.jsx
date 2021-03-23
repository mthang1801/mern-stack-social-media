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
} from "./styles/PostEditorBody.styles";
import { EditorState, convertToRaw } from "draft-js";
import { draftToHtml } from "draftjs-to-html";
import { ReactTinyLink } from "react-tiny-link";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import { IoIosImage } from "react-icons/io";
import generateBase64Image from "../../../utils/generateBase64Image";
import ImagesCarousel from "../../UI/ImagesCarousel"

const PostEditorBody = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [urlPreview, setUrlPreview] = useState(null);
  const editorRef = useRef(null);
  const [images, setImages] = useState([]);
  const [suggestions, setSuggestions] = useState(mentions);
  const [openMention, setOpenMention] = useState(true);
  
 
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
        return <a {...props} onClick={() => alert("Clicked on Link!")} />;
      },
    });
    // Mention
    const mentionPlugin = createMentionPlugin({
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
    const hashTagPlugin = createHashTagPlugin({
      hashtagComponent(props) {
        return (
          <a href={`/${props.decoratedText.replace("#", "")}`}>
            {props.children}
          </a>
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
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  useEffect(() => {
    const urlLength = document
      .getElementById("post-editor")
      .getElementsByTagName("a").length;
    console.log(urlLength);
    if (urlLength) {
      const url = document
        .getElementById("post-editor")
        .getElementsByTagName("a")
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
    <Wrapper>
     
      <DraftEditor onClick={() => editorRef.current?.focus()} id="post-editor">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          tabIndex={0}
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
      {images.length ? (
        <ImagesCarousel images={images}/>
      ) : null}
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

export default PostEditorBody;
