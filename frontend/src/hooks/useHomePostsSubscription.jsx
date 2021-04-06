import React, {useEffect} from 'react'
import {useQuery} from "@apollo/client"
import {FETCH_POSTS} from "../apollo/operations/queries/post/fetchPosts"
import {CREATE_COMMENT_SUBSCIPTION} from "../apollo/operations/subscriptions/post"
import {GET_CURRENT_USER} from "../apollo/operations/queries/cache"
import {cacheMutations} from "../apollo/operations/mutations/cache"
const useHomePostsSubscription = () => {
  const {subscribeToMore : subscribePosts} = useQuery(FETCH_POSTS, {fetchPolicy : "cache-and-network", skip : true})
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});
  const {addCommentToPost} = cacheMutations
  useEffect(()=>{
    let unsubscribeCreateComment ;
    if(user && subscribePosts){
      unsubscribeCreateComment = subscribePosts({
        document : CREATE_COMMENT_SUBSCIPTION,
        variables : {userId : user._id}, 
        updateQuery : (_, {subscriptionData})=>{
          if(subscriptionData){
            const {createCommentSubscription : {comment}} = subscriptionData.data;            
            if(comment.author._id !== user._id){
              addCommentToPost(comment.post, comment);
            }
            
          }
        } 
      })
    }
    return () => {
      if(unsubscribeCreateComment){
        unsubscribeCreateComment();
      }
    }
  },[user,subscribePosts])
}

export default useHomePostsSubscription
