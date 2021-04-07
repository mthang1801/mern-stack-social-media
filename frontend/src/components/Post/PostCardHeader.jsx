import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Information,
  Controls,
  Timeline,
  Small
} from "./styles/PostCardHeader.styles";
import { Link } from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import { useThemeUI } from "theme-ui";
import Moment from "react-moment";
import Button from "../Controls/ButtonDefaultCircle";
import { BsThreeDots } from "react-icons/bs";
import useLanguage from "../Global/useLanguage"

const PostCardHeader = ({ post }) => {
  const {i18n, lang} = useLanguage();
  const { colorMode } = useThemeUI();  
  const {status} = i18n.store.data[lang].translation.post;
  const postIcon = status.find(status => status.name === post.status.toLowerCase()).icon;
  return (
    <Wrapper theme={colorMode}>
      <Information>
        <Link to={`/${post.author.slug}`}>          
            <LazyLoadImage effect="blur" src={post.author.avatar} alt={post.author.avatar} />          
        </Link>
        <Timeline>
          <Link
            to={`/${post.author.slug}`}
            style={{ textTransform: "capitalize" }}
          >
            {post.author.name.toLowerCase()}
          </Link>
          <Small>
            <span>{postIcon()}</span>
            <Moment fromNow>{+post.createdAt}</Moment>
          </Small>
        </Timeline>
      </Information>
      <Controls>
        <Button>
          <BsThreeDots />
        </Button>
      </Controls>
    </Wrapper>
  );
};

export default PostCardHeader;
