import React from 'react';
import useLocale from '../../locales';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../theme';
import { Link } from 'react-router-dom';
import { CardWrapper } from './styles/CartProfile.styles';
const CardProfile = ({ user }) => {
  const { theme } = useTheme();
  const {
    translation: { cards },
  } = useLocale();
  return (
    <CardWrapper theme={theme}>
      <div className="user-avatar">
        <Link to={`/${user.slug}`} className="user-avatar__container">
          <img
            src={user.avatar}
            alt={'avatar'}
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
          <div className="user-association__text">{cards.friends}</div>
        </Link>
        <Link to={`/${user.slug}/groups`}>
          <div>
            <strong>{user.following.length}</strong>
          </div>
          <div className="user-association__text">{cards.following}</div>
        </Link>
        <Link to={`/${user.slug}/followers`}>
          <div>
            <strong>{user.followed.length}</strong>
          </div>
          <div className="user-association__text">{cards.followed}</div>
        </Link>
      </div>
    </CardWrapper>
  );
};

export default CardProfile;
