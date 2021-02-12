import React, { useState, useEffect, useRef } from "react";
import { Box } from "./BoxCreatePost.styles";
import BoxCreatePostHeader from "./BoxCreatePost.header";
import BoxCreatePostBody from "./BoxCreatePost.body";
import BoxCreatePostFooter from "./BoxCreatePost.footer";

import useLanguage from "../../Global/useLanguage";
import "emoji-mart/css/emoji-mart.css";
import { useThemeUI } from "theme-ui";
import Button from "@material-ui/core/Button";
import { CREATE_POST } from "../../../apollo/operations/mutations";
import { useMutation } from "@apollo/client";
import compareAndUpdateMentions from "../../../utils/listMentionsFromText";

import { convertPlainTextToHTML } from "../../../utils/convertPlainTextToHTML";

const BoxCreatePost = ({ user }) => {
  const { i18n, lang } = useLanguage();
  const [createPost, { data }] = useMutation(CREATE_POST, {
    errorPolicy: "all",
  });
  const [mindText, setMindText] = useState("");

  const [text, setText] = useState("");
  const [listBase64Images, setListBase64Images] = useState([]);
  const [imagesGalerry, setImagesGalerry] = useState([]);
  const [status, setStatus] = useState("public");
  const [mentions, setMentions] = useState([]);
  const [statusFooter, setStatusFooter] = useState([]);
  const [prefix, setPrefix] = useState(null);
  const { colorMode } = useThemeUI();

  useEffect(() => {
    setMindText(i18n.store.data[lang].translation.mindText);
    setStatusFooter(i18n.store.data[lang].translation.statusFooter);
  }, [i18n.store.data, lang]);

  const handlePost = (e) => {
    e.preventDefault();
    const fileNames = listBase64Images.map(({ name }) => name);
    const fileMimetype = listBase64Images.map(({ mimetype }) => mimetype);
    const fileEncoding = listBase64Images.map(({ src }) => src);
    const updatedMentions = compareAndUpdateMentions(text, mentions);
    const HTMLText = convertPlainTextToHTML(text, mentions);
    createPost({
      variables: {
        text: HTMLText,
        mentions: updatedMentions,
        fileNames,
        fileMimetype,
        fileEncoding,
        status,
      },
    });
  };
  return (
    <Box theme={colorMode}>
      <BoxCreatePostHeader user={user} />
      <BoxCreatePostBody
        mindText={mindText}
        text={text}
        setText={setText}
        setMentions={setMentions}
        setPrefix={setPrefix}
        imagesGalerry={imagesGalerry}
      />
      <BoxCreatePostFooter
        setText={setText}
        colorMode={colorMode}
        status={status}
        setStatus={setStatus}
        setImagesGalerry={setImagesGalerry}
        setListBase64Images={setListBase64Images}
      />
      {text && (
        <div className="submit">
          <Button
            type="button"
            color="primary"
            variant="contained"
            style={{ display: "block", width: "100%" }}
            onClick={handlePost}
          >
            Post
          </Button>
        </div>
      )}
    </Box>
  );
};

export default BoxCreatePost;
