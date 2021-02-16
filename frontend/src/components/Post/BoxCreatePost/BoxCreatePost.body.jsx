import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import { Mentions } from "antd";
import "../mentions.css";
const { Option } = Mentions;
const BoxCreatePostBody = ({
  text,
  setText,
  setMentions,
  mindText,
  setPrefix,
  imagesGalerry,
}) => {
  const imageRef = useRef(false);
  const handleChangeText = (text) => {
    setText(text);
    function urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      })
      // or alternatively
      // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
    console.log(urlify(text))
  };

  const handleSelect = (option, prefix) => {
    if (prefix === "@") {
      setMentions((prevMentions) => [
        ...prevMentions,
        { userId: option.userId, value: option.value },
      ]);
    }
  };
  const handleClickImageGallery = (e) => {
    imageRef.current.fullScreen();
  };
  
  return (
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
          prefix={["@"]}
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
  );
};

export default BoxCreatePostBody;
