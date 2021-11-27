import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  LinkItem,
  ImageContainer,
  UserInfo,
  ActiveStatus,
} from './styles/FriendItem.styles';
import { useTheme } from '../../theme';
const FriendItem = ({ data }) => {
  const { theme } = useTheme();
  return (
    <LinkItem to={data.slug} theme={theme}>
      <UserInfo>
        <ImageContainer active={data.isOnline}>
          <LazyLoadImage src={data.avatar} alt={data.avatar} />
        </ImageContainer>
        <span>{data.name}</span>
      </UserInfo>
      {data.isOnline && <ActiveStatus />}
    </LinkItem>
  );
};

export default FriendItem;
