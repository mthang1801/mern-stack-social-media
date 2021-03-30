import React, { useState, useMemo, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import ImagesCarousel from "../UI/ImagesCarousel";
import LazyLoad from "react-lazyload";
import {
  Wrapper,
  DraftEditor,
  HashtagLink,
  CardPreview,
} from "./styles/PostCardBody.styles";
const PostCardBody = ({ post }) => {  
  const [urlPreview, setUrlPreview] = useState(null);
  const images = post.files.length
    ? post.files.map((file) => ({
        src: file.data,
        name: file.filename,
      }))
    : [];
  useEffect(() => {
    const DOMTarget = document.querySelector(`[data-target=post-${post._id}]`);   
    //find Preview URL
    const urlLength = DOMTarget.querySelectorAll("[aria-label=link]").length;    
    if (urlLength) {
      const url = DOMTarget.querySelectorAll("[aria-label=link]")[urlLength - 1].getAttribute("href");
      setUrlPreview(url);
    } else {
      setUrlPreview(null);
    }
  }, [])
  
  return (
    <Wrapper>
      <DraftEditor data-target={`post-${post._id}`} dangerouslySetInnerHTML={{__html : post.text}}>
        
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
