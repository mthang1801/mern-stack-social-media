import React, { useRef, useEffect, useState } from "react";
import { HiOutlinePhotograph, HiEmojiHappy } from "react-icons/hi";
import generateBase64Image from "../../../utils/generateBase64Image";
import { Picker } from "emoji-mart";
import classNames from "classnames";
import { FaGlobeAmericas, FaUserAlt, FaUserFriends } from "react-icons/fa";
const BoxCreatePostFooter = ({
  setText,
  colorMode,
  status,
  setStatus,
  setListBase64Images,
  setImagesGalerry,
}) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const handleSelectEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.native);
  };
  const emojiRef = useRef(false);
  const statusRef = useRef(false);
  useEffect(() => {
    function handleEmojiClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setOpenEmoji(false);

      }
    }
    window.addEventListener("click", (e) => {
      handleEmojiClickOutside(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        handleEmojiClickOutside(e);
      });
  }, []);
  useEffect(() => {
    function handleStatusClickOutside(e) {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setOpenStatus(false);
      }
    }
    window.addEventListener("click", (e) => {
      handleStatusClickOutside(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        handleStatusClickOutside(e);
      });
  }, []);

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
    setImagesGalerry(
      listImagesBase64.map(({ src, name }) => ({
        original: src,
        originalAlt: name,
      }))
    );
  };

  return (
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
              setOpenStatus(false);
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
        <div className="button-icon" ref={statusRef}>
          <button onClick={() => {
            setOpenStatus((prevStatus) => !prevStatus);
            setOpenEmoji(false);
          }}>
            {postStatus[status].icon()}
          </button>
          <div className={classNames("status-box", {"show-status" : openStatus})}>
            {Object.keys(postStatus).map((statusKey) => (
              <label key={statusKey.name} htmlFor={`input-status-${statusKey}`}>
                <span>
                  {postStatus[statusKey].icon()} {postStatus[statusKey].name}
                </span>
                <input
                  type="radio"
                  name="status"
                  id={`input-status-${statusKey}`}
                  value={status}
                  checked={status === statusKey}
                  onChange={() => setStatus(statusKey)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const postStatus = {
  public: {
    name: "Public",
    icon: () => <FaGlobeAmericas />,
  },
  private: {
    name: "Private",
    icon: () => <FaUserAlt />,
  },
  friends: {
    name: "Friends",
    icon: () => <FaUserFriends />,
  },
};

export default BoxCreatePostFooter;
