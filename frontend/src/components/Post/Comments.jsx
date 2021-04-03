import React from 'react'
import {Wrapper} from "./styles/Comments.styles"
import CommentItem from "./CommentItem";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../../apollo/operations/queries/cache"
const Comments = ({comments}) => {
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"})  
  console.log(comments)
  return (
    <Wrapper>
      {comments.length ? comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} user={user}/>
      )): null}
    </Wrapper>
  )
}

export default React.memo(Comments)
