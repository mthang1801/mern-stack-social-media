import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { LinkItem, ImageContainer } from "./styles/FriendItem.styles";
import { useThemeUI } from "theme-ui";
const FriendItem = ({ data }) => {
  const { colorMode } = useThemeUI();
  return (
    <LinkItem to={data.slug} theme={colorMode}>
      <ImageContainer active={data.isOnline}>
        <LazyLoadImage src={data.avatar} alt={data.avatar} />
      </ImageContainer>
      <span>{data.name}</span>
    </LinkItem>
  );
};

export default FriendItem;
