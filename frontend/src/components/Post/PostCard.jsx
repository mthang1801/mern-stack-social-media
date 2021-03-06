import React, { useState, useEffect } from "react";
import { Wrapper, FetchMoreLink } from "./styles/PostCard.styles";
import { useThemeUI } from "theme-ui";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import Comments from "./Comments";
import { FETCH_COMMENTS } from "../../apollo/post/post.queries";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/cache";
import useLanguage from "../Global/useLanguage";
import { EditorState, convertFromRaw } from "draft-js";
import EditPostDialog from "./EditPostDialog";
import { addCommentsToPost } from "../../apollo/post/post.caches";
import { addCommentsToPostInPersonalUser } from "../../apollo/post/post.caches";

const PostCard = ({ post }) => {
  const { colorMode } = useThemeUI();
  const user = useReactiveVar(userVar);
  const { refetch: fetchComments } = useQuery(FETCH_COMMENTS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const [loading, setLoading] = useState(false);
  const { i18n, lang } = useLanguage();

  const { fetchMoreComments } = i18n.store.data[lang].translation.comment;
  
  //for edit
  const [isEdited, setIsEdited] = useState(false);
  const [editedEditorState, setEditedEditorState] = useState(
    EditorState.createEmpty()
  );  
  const onFetchComments = () => {
    setLoading(true);    
    fetchComments({ postId: post._id }).then(({ data }) => {      
      if (data.fetchComments) {        
        addCommentsToPost(post._id, data.fetchComments);
        addCommentsToPostInPersonalUser(post._id, data.fetchComments);
      }
      setLoading(false);
    });
  };

  const onFetchMoreComments = () => {
    setLoading(true);
    const skip = post.commentsData.length;
    fetchComments({ postId: post._id, skip }).then(({ data }) => {      
      if (data.fetchComments) {
        addCommentsToPost(post._id, data.fetchComments);
        addCommentsToPostInPersonalUser(post._id, data.fetchComments);
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
    <Wrapper theme={colorMode}>
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
