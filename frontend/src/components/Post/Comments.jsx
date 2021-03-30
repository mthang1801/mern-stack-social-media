import React from 'react'
import {Wrapper} from "./styles/Comments.styles"
import CommentItem from "./CommentItem";
const Comments = ({comments}) => {
  
  return (
    <Wrapper>
      {comments.map(comment => (
        <CommentItem key={comment._id} comment={comment}/>
      ))}
    </Wrapper>
  )
}

export default Comments
