import React from 'react'
import {Wrapper} from "./styles/PostCard.styles"
import {useThemeUI} from "theme-ui"
import PostCardHeader from "./PostCardHeader"
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter"
const PostCard = ({post}) => {
  const {colorMode} = useThemeUI()
  return (
    <Wrapper theme={colorMode}>
      <PostCardHeader post={post}/>
      <PostCardBody post={post}/>
      <PostCardFooter post={post}/>
    </Wrapper>
  )
}

export default React.memo(PostCard)
