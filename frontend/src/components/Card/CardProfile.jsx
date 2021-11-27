import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useThemeUI } from 'theme-ui';
import { Link } from 'react-router-dom';
import { CardWrapper } from './styles/CartProfile.styles';
const CardProfile = ({ user }) => {
  const { colorMode } = useThemeUI();
  console.log(user);
  return (
    <CardWrapper theme={colorMode}>
      <div className="user-avatar">
        <Link to={`/${user.slug}`} className="user-avatar__container">
          <LazyLoadImage
            src={user.avatar}
            alt={user.avatar}
            effect="blur"
            width="60px"
            height="60px"
            className="user-avatar__image"
          />
        </Link>
      </div>
      <a href={`/${user.slug}`} className="user-name">
        <h4 className="user-name__primary">{user.name}</h4>

        <h6 className="user-name__secondary">@{user.slug}</h6>
      </a>
      <div className="user-association">
        <Link to={`/${user.slug}/friends`}>
          <div>
            <strong>{user.friends.length}</strong>
          </div>
          <div>Friends</div>
        </Link>
        <Link to={`/${user.slug}/groups`}>
          <div>
            <strong>{user.following.length}</strong>
          </div>
          <div>Following</div>
        </Link>
        <Link to={`/${user.slug}/followers`}>
          <div>
            <strong>{user.followed.length}</strong>
          </div>
          <div>Followers</div>
        </Link>
      </div>
    </CardWrapper>
  );
};

export default CardProfile;
