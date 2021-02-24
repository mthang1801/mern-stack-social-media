import React from 'react'

import {LazyLoadImage} from "react-lazy-load-image-component"
import {LinkItem} from "./Sidebar.styles"
import {useThemeUI} from "theme-ui"
const FriendItem = ({data}) => {
  const {colorMode} = useThemeUI()
  return (
    <LinkItem to={data.slug} theme={colorMode}>
      <LazyLoadImage src={data.avatar} alt={data.avatar}/>
      <span>{data.name}</span>
    </LinkItem>
  )
}

export default FriendItem
