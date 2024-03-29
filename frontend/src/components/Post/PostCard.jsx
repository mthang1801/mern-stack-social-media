import React, { useState, useEffect } from 'react';
import { Wrapper, FetchMoreLink } from './styles/PostCard.styles';
import { useTheme } from '../../theme';
import PostCardHeader from './PostCardHeader';
import PostCardBody from './PostCardBody';
import PostCardFooter from './PostCardFooter';
import Comments from './Comments';
import { FETCH_COMMENTS } from '../../apollo/post/post.queries';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/cache';
import useLocale from '../../locales';
import { EditorState, convertFromRaw } from 'draft-js';
import EditPostDialog from './EditPostDialog';
import { addFetchedCommentsToPost } from '../../apollo/post/post.caches';

const PostCard = ({ post }) => {
  const { theme } = useTheme();
  const user = useReactiveVar(userVar);
  const { refetch: fetchComments } = useQuery(FETCH_COMMENTS, {
    fetchPolicy: 'cache-and-network',
    skip: true,
  });
  const [loading, setLoading] = useState(false);
  const { translation } = useLocale();

  const { fetchMoreComments } = translation.comment;

  //for edit
  const [isEdited, setIsEdited] = useState(false);
  const [editedEditorState, setEditedEditorState] = useState(
    EditorState.createEmpty()
  );
  const onFetchComments = () => {
    setLoading(true);
    console.log(post._id);
    fetchComments({ postId: post._id }).then(({ data }) => {
      if (data.fetchComments) {
        addFetchedCommentsToPost(post._id, data.fetchComments);
      }
      setLoading(false);
    });
  };

  const onFetchMoreComments = () => {
    const skip = post.commentsData.length;
    fetchComments({ postId: post._id, skip }).then(({ data }) => {
      if (data.fetchComments) {
        addFetchedCommentsToPost(post._id, data.fetchComments);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isEdited) {
      setEditedEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(post.rawText)))
      );
    }
  }, [isEdited]);

  return (
    <Wrapper theme={theme}>
      <EditPostDialog
        open={isEdited}
        setOpen={setIsEdited}
        editedEditorState={editedEditorState}
        post={post}
      />
      <PostCardHeader post={post} user={user} setIsEdited={setIsEdited} />
      <PostCardBody post={post} />
      <PostCardFooter post={post} user={user} fetchComments={onFetchComments} />
      {loading && <div>Loading...</div>}
      {post.commentsData && <Comments comments={post.commentsData} />}
      {post.commentsData?.length < post.comments.length && (
        <FetchMoreLink onClick={onFetchMoreComments}>
          {fetchMoreComments}
        </FetchMoreLink>
      )}
    </Wrapper>
  );
};

export default React.memo(PostCard);
