import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PostToolbarHeader from "./PostToolbarHeader";
import useLanguage from "../Global/useLanguage";
import { HiOutlinePhotograph, HiEmojiHappy } from "react-icons/hi";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useThemeUI } from "theme-ui";
import generateBase64Image from "../../utils/generateBase64Image";
import classNames from "classnames";
import RenderImages from "./RenderImages";
import { Mentions } from "antd";
import "./mentions.css";
import Button from "@material-ui/core/Button";
import { CREATE_POST } from "../../apollo/operations/mutations";
import { useMutation } from "@apollo/client";
import compareAndUpdateMentions from "../../utils/listMentionsFromText"
const { Option } = Mentions;
const PostToolbar = () => {
  const { i18n, lang } = useLanguage();
  const [createPost, { data }] = useMutation(CREATE_POST, {
    errorPolicy: "all",
  });
  const [mindText, setMindText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [listBase64Images, setListBase64Images] = useState([]);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("public");
  const [mentions, setMentions] = useState([]);
  const [statusFooter, setStatusFooter] = useState([]);
  const [prefix, setPrefix] = useState(null);
  const { colorMode } = useThemeUI();
  const emojiRef = useRef(false);
  useEffect(() => {
    setMindText(i18n.store.data[lang].translation.mindText);
    setStatusFooter(i18n.store.data[lang].translation.statusFooter);
  }, [i18n.store.data, lang]);

  useEffect(() => {
    function hanleEmojiClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setOpenEmoji(false);
      }
    }
    window.addEventListener("click", (e) => {
      hanleEmojiClickOutside(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        hanleEmojiClickOutside(e);
      });
  }, []);

  const handleSelectEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.native);
  };
  const handleChangeImage = async (e) => {
    const length = e.target.files.length;
    const listImages = [];
    for (let i = 0; i < length; i++) {
      listImages.push(e.target.files[i]);
    }
    const imageBase64Promise = listImages.map(async (file) => {
      return await generateBase64Image(file);
    });
    const listImagesBase64 = await Promise.all(imageBase64Promise);
    setListBase64Images(listImagesBase64);
  };

  const handleChangeText =(text) => {            
    setText(text);
  };

  const handleSelect = (option, prefix) => {
    if (prefix === "@") {
      setMentions((prevMentions) => [
        ...prevMentions,
        {userId: option.userId, value : option.value}
      ]);
    } else {
      setTags((prevTags) => [...prevTags, {userId: option.userId, value : option.value}]);
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    const fileNames = listBase64Images.map(({ name }) => name);
    const fileMimetype = listBase64Images.map(({ mimetype }) => mimetype);
    const fileEncoding = listBase64Images.map(({ src }) => src);      
    const updatedMentions = compareAndUpdateMentions(text, mentions) 
    const tagsValue = tags.map(({value}) => value);        
    createPost({
      variables: {
        text,
        mentions: updatedMentions,
        tags : tagsValue,
        fileNames,
        fileMimetype,
        fileEncoding,
        status
      },
    });
  };

  return (
    <PostBox theme={colorMode}>
      <div className="heading">
        <PostToolbarHeader />
      </div>

      <div className="body">
        <Mentions
          placeholder={mindText}
          className="mind-text"
          value={text}
          onChange={(text) => handleChangeText(text)}
          autoSize={{ minRows: 3, maxRows: 10 }}
          onSelect={handleSelect}
          onSearch={(text, prefix) => {
            setPrefix(prefix);
          }}
          prefix={["@", "#"]}
        >
          <Option userId="602097c740303021c0dcebed" value="mthang1801.dev">
            mthang1801.dev@gmail.com
          </Option>
          <Option userId="602097ad40303021c0dcebec" value="mthang1801">
            mthang1801@gmail.com
          </Option>
          <Option userId="602097f140303021c0dcebee" value="maivthang95">
            maivthang95@gmail.com
          </Option>
          <Option userId="6020980040303021c0dcebef" value="maithang1">
            maivthang1@gmail.com
          </Option>

          <Option userId="6020980d40303021c0dcebf0" value="maivthang2">
            maivthang2@gmail.com
          </Option>
        </Mentions>
        <div className="list-images">
          <RenderImages images={listBase64Images} />
        </div>
      </div>

      <div className="footer">
        <label htmlFor="photo-input" className="abstract-input photo-input">
          <HiOutlinePhotograph />
          <input
            type="file"
            name="photo-input"
            id="photo-input"
            multiple
            onChange={handleChangeImage}
          />
        </label>
        <label
          htmlFor="emoji-input"
          className="abstract-input emoji-input"
          ref={emojiRef}
        >
          <HiEmojiHappy
            onClick={(e) => {
              e.stopPropagation();
              setOpenEmoji((prevState) => !prevState);
            }}
          />
          <span className={classNames({ "show-emoji": openEmoji })}>
            <Picker
              theme={colorMode}
              onSelect={handleSelectEmoji}
              showPreview={false}
              showSkinTones={false}
              emojiTooltip={true}
            />
          </span>
        </label>
      </div>
      <Button
        type="button"
        color="primary"
        variant="contained"
        style={{ display: "block", width: "90%", margin: "auto" }}
        onClick={handlePost}
      >
        Post
      </Button>
    </PostBox>
  );
};

const PostBox = styled.section`
  width: 95%;
  margin: auto;
  padding-bottom: 1rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 8px;
  box-shadow: var(--lightShadow);
  .heading,
  .body {
    padding: 0.5rem;
    border-bottom: 1px solid var(--gray-deep);
  }
  .footer {
    display: flex;
    padding: 0.5rem 1rem;
  }

  .body {
    height: auto;
  }
  .mind-text {
    width: 100%;
    position: relative;
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
    color: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 0;
    resize: none;
    font-family: var(--fontFamily);
    font-size: 1rem;
    & .rc-mentions-measure {
      position: absolute;
      top: 0;
    }
  }

  label.abstract-input {
    cursor: pointer;
    font-size: 1.6rem;
    margin-right: 0.5rem;
    & input,
    & span {
      display: none;
    }
  }
  .photo-input {
    color: var(--success);
  }
  .emoji-input {
    color: var(--yellow);
    position: relative;
  }
  .show-emoji {
    display: block !important;
    position: absolute;
    z-index : 1 ;
  }
  .list-images {
    width: 100%;
  }

  .hide-option {
    display: none;
  }
`;

export default PostToolbar;
