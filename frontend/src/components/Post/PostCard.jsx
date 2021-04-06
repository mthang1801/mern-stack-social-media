import React, {useState} from 'react'
import {Wrapper, FetchMoreLink} from "./styles/PostCard.styles"
import {useThemeUI} from "theme-ui"
import PostCardHeader from "./PostCardHeader"
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter"
import Comments from "./Comments"
import {FETCH_COMMENTS} from "../../apollo/operations/queries/post/fetchComments"
import {useQuery} from "@apollo/client";
import {cacheMutations} from "../../apollo/operations/mutations/cache/"
import useLanguage from "../Global/useLanguage"
const PostCard = ({post}) => {
  const {colorMode} = useThemeUI()    
  const {refetch : fetchComments } = useQuery(FETCH_COMMENTS, {fetchPolicy : "cache-and-network", skip : true});
  const [loading, setLoading] = useState(false);  
  const {i18n, lang} = useLanguage();
  const {fetchMoreComments} = i18n.store.data[lang].translation.comment;
  const {addCommentsToPost} = cacheMutations
  const onFetchComments = () => {
    setLoading(true);
    fetchComments({postId: post._id}).then(({data}) => {
      if(data.fetchComments){
        addCommentsToPost(post._id, data.fetchComments);
      }
      setLoading(false);
    })
  }
  
  const onFetchMoreComments = () => {
    setLoading(true);
    const skip = post.commentsData.length;     
    fetchComments({postId : post._id, skip}).then(({data})=> {
      if(data.fetchComments){
        addCommentsToPost(post._id, data.fetchComments);
      }
      setLoading(false);
    })
  }
  
  return (
    <Wrapper theme={colorMode}>
      <PostCardHeader post={post}/>
      <PostCardBody post={post}/>
      <PostCardFooter post={post} fetchComments={onFetchComments}/>        
      {loading && <div>Loading...</div>}      
      {post.commentsData && <Comments comments={post.commentsData} />}      
      {post.commentsData?.length < post.comments.length && (<FetchMoreLink onClick={onFetchMoreComments}>{fetchMoreComments}</FetchMoreLink>)}
    </Wrapper>
  )
}

export default React.memo(PostCard)
