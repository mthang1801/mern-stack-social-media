import React from 'react'
import {Wrapper} from "./styles/PostCard.styles"
import {useThemeUI} from "theme-ui"
import PostCardHeader from "./PostCardHeader"
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter"
import Comments from "./Comments"
const PostCard = ({post}) => {
  const {colorMode} = useThemeUI()  
  return (
    <Wrapper theme={colorMode}>
      <PostCardHeader post={post}/>
      <PostCardBody post={post}/>
      <PostCardFooter post={post}/>    
      {post.comments.length ? <Comments comments={post.comments}/> : null }
    </Wrapper>
  )
}

export default React.memo(PostCard)
