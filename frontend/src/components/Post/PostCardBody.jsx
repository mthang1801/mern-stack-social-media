import React, { useState, useMemo, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import { EditorState, convertFromRaw, convertFromHTML } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import createHashTagPlugin from "@draft-js-plugins/hashtag";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import ImagesCarousel from "../UI/ImagesCarousel";
import LazyLoad from "react-lazyload";
import {
  Wrapper,
  DraftEditor,
  HashtagLink,
  CardPreview,
} from "./styles/PostCardBody.styles";
import { useHistory } from "react-router-dom";
const PostCardBody = ({ post }) => {
  const [urlPreview, setUrlPreview] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.text)))
  );  
  const images = post.files.length
    ? post.files.map((file) => ({
        src: file.data,
        name: file.filename,
      }))
    : [];
  const { push } = useHistory();
  // useMemo plugins
  // useMemo plugins
  const { plugins } = useMemo(() => {
    // Emoji
    const emojiPlugin = createEmojiPlugin({
      selectButtonContent: "😀",
    });
    // Linkify
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
      rel: "noopener noreferrer",
      component(props) {
        return <a {...props} />;
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
    // hashTag
    const plugins = [mentionPlugin, hashTagPlugin, emojiPlugin, linkifyPlugin];
    return { plugins };
  }, []);

  useEffect(() => {
    const urlLength = document
      .querySelector(`[data-target="${post._id}"]`)
      ?.getElementsByTagName("a")?.length;
    if (urlLength) {
      const url = document
        .querySelector(`[data-target="${post._id}"]`)
        .getElementsByTagName("a")
        [urlLength - 1].getAttribute("href");
      setUrlPreview(url);
    } else {
      setUrlPreview(null);
    }
  }, [editorState]);

  return (
    <Wrapper>
      <DraftEditor data-target={`${post._id}`}>
        <Editor
          editorState={editorState}
          setEditorState={setEditorState}
          plugins={plugins}
          onChange={setEditorState}
          readOnly                  
        />
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
        <LazyLoad>
          <ImagesCarousel images={images} />
        </LazyLoad>
      ) : null}
    </Wrapper>
  );
};

export default PostCardBody;
