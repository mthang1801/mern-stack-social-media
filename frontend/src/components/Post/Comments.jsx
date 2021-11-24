import React from 'react';
import { Wrapper } from './styles/Comments.styles';
import CommentItem from './CommentItem';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/cache';
const Comments = ({ comments }) => {
  const user = useReactiveVar(userVar);
  return (
    <Wrapper>
      {comments.length
        ? comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} user={user} />
          ))
        : null}
    </Wrapper>
  );
};

export default React.memo(Comments);
