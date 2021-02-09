import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen } from "react-icons/bs";
import "./mentions.css";
import useLanguage from "../Global/useLanguage";
import { HiOutlinePhotograph, HiEmojiHappy } from "react-icons/hi";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useThemeUI } from "theme-ui";
import generateBase64Image from "../../utils/generateBase64Image";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { CREATE_POST } from "../../apollo/operations/mutations";
import { useMutation } from "@apollo/client";
import compareAndUpdateMentions from "../../utils/listMentionsFromText";
import { Mentions } from "antd";
import ImageGallery from "react-image-gallery";
const { Option } = Mentions;
const BoxCreatePost = ({ user }) => {
  const { i18n, lang } = useLanguage();
  const [createPost, { data }] = useMutation(CREATE_POST, {
    errorPolicy: "all",
  });
  const [mindText, setMindText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [listBase64Images, setListBase64Images] = useState([]);
  const [imagesGalerry, setImagesGalerry] = useState([]);
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
  const imageRef = useRef(false);
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
    setImagesGalerry(listImagesBase64.map(({src, name}) => ({original: src,      
      originalAlt: name})))
  };  

  const handleChangeText = (text) => {
    setText(text);
  };

  const handleSelect = (option, prefix) => {
    if (prefix === "@") {
      setMentions((prevMentions) => [
        ...prevMentions,
        { userId: option.userId, value: option.value },
      ]);
    } else {
      setTags((prevTags) => [
        ...prevTags,
        { userId: option.userId, value: option.value },
      ]);
    }
  };
  const handleClickImageGallery = (e) => {
    imageRef.current.fullScreen();
  };

  const handlePost = (e) => {
    e.preventDefault();
    const fileNames = listBase64Images.map(({ name }) => name);
    const fileMimetype = listBase64Images.map(({ mimetype }) => mimetype);
    const fileEncoding = listBase64Images.map(({ src }) => src);
    const updatedMentions = compareAndUpdateMentions(text, mentions);
    const tagsValue = tags.map(({ value }) => value);
    createPost({
      variables: {
        text,
        mentions: updatedMentions,
        tags: tagsValue,
        fileNames,
        fileMimetype,
        fileEncoding,
        status,
      },
    });
  };
  return (
    <Box theme={colorMode}>
      <div className="box-header">
        <div className="box-header__avatar">
          <img src={`/images/${user.avatar}`} alt="avatar" />
        </div>
        <div className="box-header__center">
          <div className="box-header__center-username">{user.name}</div>
          <small className="box-header__center-current-position">
            Post To Timeline
          </small>
        </div>
        <div className="box-header__box-zoom">
          <button>
            <BsArrowsFullscreen />
          </button>
        </div>
      </div>
      <div className="box-body">
        <div className="box-body__textarea">
          <Mentions
            placeholder={mindText}
            className="text-post"
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
        </div>
        <div className="box-body__render_images">
        <ImageGallery
            items={imagesGalerry}
            lazyLoad={true}
            ref={imageRef}
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            onClick={handleClickImageGallery}            
          />
        </div>
      </div>
      <div className="box-footer">
        <div className="box-footer__actions">
          <label htmlFor="input-photo" className="input-icon input-photo">
            <HiOutlinePhotograph />
            <input
              type="file"
              name="input-photo"
              id="input-photo"
              multiple
              onChange={handleChangeImage}
            />
          </label>
          <label
            htmlFor="input-emoji"
            className="input-icon input-emoji"
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
        {text &&
        <Button
          type="button"
          color="primary"
          variant="contained"
          style={{ display: "block", width: "100%" }}
          onClick={handlePost}
        >
          Post
        </Button>
        }
      </div>
    </Box>
  );
};

const Box = styled.div`
  width: 95%;
  margin: auto;
  
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 8px;
  box-shadow: var(--lightShadow);
  & > * {
    padding: 0.5rem 1rem;
    &:not(:last-child){
      border-bottom: 1px solid
      ${({ theme }) =>
        theme === "dark" ? "var(--gray-dark)" : "var(--gray-light)"};
    }
  }
  .box-header {
    display: flex;
    align-items: center;
    &__avatar {
      width: 40px;
      height: 40px;
      margin-right: 0.5rem;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &__center {
      flex: 1;
      &-username {
        text-transform: capitalize;
        font-size: 0.95rem;
        font-weight: 600;
      }
      &-current-position {
        padding: 0.2rem 0.6rem;
        text-align: center;
        background-color: var(--light);
        border-radius: 0.5rem;
      }
    }
    &__box-zoom {
      button {
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.2rem;
      }
    }
  }
  .box-body {
    .text-post {
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
    .image-gallery-svg {
      height: 30px;
    }
  }
  .box-footer {
    &__actions {
      display: flex;
      label.input-icon {
        cursor: pointer;
        font-size: 1.6rem;
        margin-right: 0.5rem;
        & input,
        & span {
          display: none;
        }
      }
      .input-photo {
        color: var(--success);
      }
      .input-emoji {
        color: var(--yellow);
        position: relative;
      }
      .show-emoji {
        display: block !important;
        position: absolute;
        z-index: 1;
      }
    }
  }
`;

export default BoxCreatePost;
