import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import Button from "../Controls/ButtonDefault";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Mentions } from "antd";
import { useThemeUI } from "theme-ui";
import { BiLike, BiCommentDetail, BiShare } from "react-icons/bi";
import ImageGallery from "react-image-gallery";
import {Link} from "react-router-dom"
const PostCard = ({ post }) => {
  const { colorMode } = useThemeUI();
  const [imagesGalerry, setImagesGalerry] = useState([]);
  const imageRef = useRef(false);
  useEffect(() => {
    if (post && post.files.length) {
      setImagesGalerry(
        post.files.map((file) => ({
          original: file.encoding,
          thumbnail: file.encoding,
          originalAlt: file.filename,
        }))
      );
    }
  }, [post]);
  const handleClickImageGallery = (e) => {
    imageRef.current.fullScreen();
  };
  const createMarkup = (textHTML) => {
    return {__html: textHTML}
  }
  return (
    <PostCardWrapper theme={colorMode}>
      <div className="card-header">
        <Link to={`/user/${post.author._id}`} className="card-header__avatar">
          <img src={`${post.author.avatar}`} alt="avatar"/>
        </Link>
        <div className="card-header__center">
          <Link to={`/user/${post.author._id}`} className="card-header__center-author">{post.author.name}</Link>
          <div className="card-header__center-date">
            {Date.now() - +post.createdAt > 3600000 ? (
              <Moment format="DD/MM/YYYY HH:MM">{+post.createdAt}</Moment>
            ) : (
              <Moment fromNow>{+post.createdAt}</Moment>
            )}
          </div>
        </div>
        <div className="card-header__options-btn">
          <Button variant="outlined">
            <HiOutlineDotsHorizontal />
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div dangerouslySetInnerHTML={createMarkup(post.text)} className="card-body__render-text"></div>
        <div className="card-body__images">
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
      <div className="card-footer">
        <div className="card-footer__actions">
          <button>
            <BiLike /> Like
          </button>
          <button>
            <BiCommentDetail /> Comment
          </button>
          <button>
            <BiShare /> Share
          </button>
        </div>
        <div className="card-footer__input">
          <div className="card-footer__input-user-avatar">
            <img src={"/images/avatar-default.png"} alt="avatar"/>
          </div>
          <div className="card-footer__input-type-text">
            <Mentions
              autoSize={{ minRows: 1, maxRows: 5 }}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
      </div>
    </PostCardWrapper>
  );
};

const PostCardWrapper = styled.article`
  border-radius: 0.5rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  width: 95%;
  padding-bottom: 1rem;
  overflow: hidden;
  box-shadow: var(--lightShadow);
  margin: 0 auto 1rem auto;
  .card-header {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    &__avatar {
      margin-right: 0.75rem;
      width : 40px;
      height : 40px;
      & img {
        height : 100%;
        width : 100%;
        border-radius: 50%;
      }
    }
    &__center {
      flex: 1;
      display: flex;
      flex-direction: column;
      &-author {
        text-transform: capitalize;
      }
      &-date {
        font-size: 0.9em;
        color: var(--gray);
      }
    }
  }
  .card-body {
    margin: 0.25rem 0 0.5rem 0;
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
    &__text {
      border: none;
    }
    .image-gallery-svg {      
      height: 30px;
    }       
    &__render-text{
      padding : 0.5rem 1rem;
      p{
        margin: unset;
      }
      a{
        color : var(--primary);
        &:hover{
          color : var(--color-primary);
        }
      }     
    }
    
  }
  .card-footer {
    &__actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.1rem;
      border: 1px solid ${({theme}) => theme === "dark" ? "var(--gray-dark)" : "var(--gray-light)"};
      border-left: none;
      border-right: none;
      margin: 0.5rem 0;      
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        padding: 0.85rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        background-color: transparent;
        color: ${({theme}) => theme === "dark" ? "var(--color-text-dark)" : "var(--color-text-light)" } ;
        font-weight: 600;
        & svg {
          font-size: 1.2em;
          margin-right: 0.2rem;
        }
        &:hover {
          background-color: ${({theme}) => theme === "dark" ? "var(--color-background-dark)" : "var(--color-background-default)"};
        }
      }
    }
    &__input {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0.25rem 0.5rem;
      &-user-avatar {
        width: 32px;
        height: 32px;
        & img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      &-type-text {
        flex: 1;
        margin-left: 0.5rem;
        .ant-mentions {
          border-radius: 8px;
        }
      }      
    }
  }
`;

export default PostCard;
