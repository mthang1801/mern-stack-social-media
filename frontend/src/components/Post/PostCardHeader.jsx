import React, { useState, useEffect, useRef } from 'react';
import {
  Wrapper,
  Information,
  Controls,
  Timeline,
  Small,
} from './styles/PostCardHeader.styles';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../theme';
import Moment from 'react-moment';
import Button from '../Controls/ButtonDefaultCircle';
import { BsThreeDots } from 'react-icons/bs';
import useLocale from '../../locales';
import {
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
} from '../UI/styles/Dropdown.styles';
const PostCardHeader = ({ post, user, setIsEdited }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const { translation } = useLocale();
  const { theme } = useTheme();
  const {
    status,
    heading: {
      settingOwnPost: {
        pinPost,
        savePost,
        editPost,
        editAudience,
        moveToTrash,
      },
    },
  } = translation.post;

  const settingRef = useRef(null);
  const postIcon = status.find(
    (status) => status.key.toLowerCase() === post.status.toLowerCase()
  ).icon;

  useEffect(() => {
    function trackUserClickEvent(e) {
      if (settingRef.current && openSetting) {
        setOpenSetting(false);
      }
    }

    window.addEventListener('click', trackUserClickEvent);
    return () => window.removeEventListener('click', trackUserClickEvent);
  });
  return (
    <Wrapper theme={theme}>
      <Information>
        <Link to={`/${post.author.slug}`}>
          <img effect="blur" src={post.author.avatar} alt={'avtar'} />
        </Link>
        <Timeline>
          <Link
            to={`/${post.author.slug}`}
            style={{ textTransform: 'capitalize' }}
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
        <DropdownContainer ref={settingRef}>
          <Button onClick={() => setOpenSetting((prevState) => !prevState)}>
            <BsThreeDots />
          </Button>
          {openSetting && (
            <DropdownMenu position="top" theme={theme}>
              <DropdownItem>
                <span>{pinPost.icon}</span>
                <span>{pinPost.name}</span>
              </DropdownItem>
              <DropdownItem>
                <span>{savePost.icon}</span>
                <span>{savePost.name}</span>
              </DropdownItem>
              <hr />
              {user._id === post.author._id && (
                <DropdownItem onClick={() => setIsEdited(true)}>
                  <span>{editPost.icon}</span>
                  <span>{editPost.name}</span>
                </DropdownItem>
              )}
              <DropdownItem>
                <span>{editAudience.icon}</span>
                <span>{editAudience.name}</span>
              </DropdownItem>
              <hr />
              <DropdownItem>
                <span>{moveToTrash.icon}</span>
                <span>{moveToTrash.name}</span>
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownContainer>
      </Controls>
    </Wrapper>
  );
};

export default PostCardHeader;
