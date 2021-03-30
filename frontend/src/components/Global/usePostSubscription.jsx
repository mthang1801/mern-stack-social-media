import React ,{ useEffect} from 'react'
import {useQuery} from "@apollo/client"
import {GET_USE_POST_SUBSCRIPTION_CACHE_DATA} from "../../apollo/operations/queries/cache/components/getUsePostsSubscription"
import subscriptions from "../../apollo/operations/subscriptions"
import {FETCH_POSTS} from "../../apollo/operations/queries/post/fetchPosts"
const usePostSubscription = () => {
  const {subscribeToMore : subscriptionPosts} = useQuery(FETCH_POSTS, {skip : true});
  const {data : {user, personalPosts}} = useQuery(GET_USE_POST_SUBSCRIPTION_CACHE_DATA, {fetchPolicy : "cache-first"});
  useEffect(() => {
    let unsubscribeNewComment;
    if(subscriptionPosts && user){
      
    }
  },[subscriptionPosts, user]) 
}

export default usePostSubscription
