import {useEffect} from 'react'
import {useQuery, useReactiveVar} from "@apollo/client"
import {FETCH_POSTS} from "../apollo/operations/queries/post/fetchPosts"
import {CREATE_COMMENT_SUBSCIPTION, CREATE_RESPONSE_SUBSCRIPTION, EDIT_POST_SUBSCRIPTION} from "../apollo/operations/subscriptions/post"
import {userVar} from "../apollo/cache"
import {addCommentToPost, addNewResponseToComment, updatePost} from "../apollo/post/post.caches"
const useHomePostsSubscription = () => {
  const {subscribeToMore : subscribePosts} = useQuery(FETCH_POSTS, {fetchPolicy : "cache-and-network", skip : true})
  const user = useReactiveVar(userVar);
  useEffect(()=>{
    let unsubscribeCreateComment, unsubscribeCreateResponse, unsubscribeUpdatePost ;
    if(user && subscribePosts){
      unsubscribeCreateComment = subscribePosts({
        document : CREATE_COMMENT_SUBSCIPTION,
        variables : {userId : user._id}, 
        updateQuery : (_, {subscriptionData})=>{
          if(subscriptionData){
            const {createCommentSubscription : comment} = subscriptionData.data;            
            if(comment.author._id !== user._id){
              addCommentToPost(comment.post, comment);
            }            
          }
        } 
      });
      unsubscribeCreateResponse = subscribePosts({
        document : CREATE_RESPONSE_SUBSCRIPTION, 
        variables : {userId : user._id}, 
        updateQuery : (_ , {subscriptionData}) => {
          console.log(subscriptionData)
          if(subscriptionData){
            const {createResponseSubscription : response} = subscriptionData.data;
            if(response.author._id !== user._id){
              addNewResponseToComment(response.post, response.comment, response);
            }
          }
        }
      })
      unsubscribeUpdatePost = subscribePosts({
        document : EDIT_POST_SUBSCRIPTION, 
        updateQuery : (_, {subscriptionData}) => {
          console.log(subscriptionData)
          if(subscriptionData){
            const {editPostSubscription} = subscriptionData.data;            
            updatePost(editPostSubscription);
          }
          
        }
      })
    }
    return () => {
      if(unsubscribeCreateComment){
        unsubscribeCreateComment();
      }
      if(unsubscribeCreateResponse){
        unsubscribeCreateResponse();
      }
      if(unsubscribeUpdatePost){
        unsubscribeUpdatePost();
      }
    }
  },[user,subscribePosts])
}

export default useHomePostsSubscription
