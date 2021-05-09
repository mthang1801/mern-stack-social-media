import React, { useEffect } from "react";
import { useReactiveVar, useQuery } from "@apollo/client";
import { userVar, currentPersonalUserVar } from "../apollo/cache";
import {
  LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
} from "../apollo/notification/notification.types";
import { FETCH_PERSONAL_USER } from "../apollo/user/user.types";
import {
  userLikePostInCurrentPersonalUser,
  userRemoveLikePostInCurrentPersonalUser,
} from "../apollo/user/currentPersonalUser.caches";
const useCurrentUserSubscription = () => {
  const user = useReactiveVar(userVar);
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const {
    subscribeToMore: currentPersonalUserSubscription,
  } = useQuery(FETCH_PERSONAL_USER, { skip: true });
  useEffect(() => {
    let unsubscribeUserLikePost, unsubscribeRemoveLikePost;
    if (currentPersonalUser && currentPersonalUserSubscription) {
      unsubscribeUserLikePost = currentPersonalUserSubscription({
        document: LIKE_POST_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData?.data) {
            const { likePostSubscription } = subscriptionData.data;
            if (likePostSubscription?.fieldIdentity?.post) {
              userLikePostInCurrentPersonalUser(
                likePostSubscription.fieldIdentity.post
              );
            }
          }
        },
      });
      unsubscribeRemoveLikePost = currentPersonalUserSubscription({
        document: REMOVE_LIKE_POST_SUBSCRIPTION,         
        updateQuery: (_, { subscriptionData }) => {          
          console.log(subscriptionData)
          if (subscriptionData) {
            const { removeLikePostSubscription : {creator : {_id : userId}, fieldIdentity : {post :{_id : postId}}} } = subscriptionData.data;                        
              // userRemoveLikePostInCurrentPersonalUser(remove)            
          }
        },
      });
    }
    return () => {
      if (unsubscribeUserLikePost) {
        unsubscribeUserLikePost();
      }
      if (unsubscribeRemoveLikePost) {
        unsubscribeRemoveLikePost();
      }
    };
  }, [user, currentPersonalUser, currentPersonalUserSubscription]);  
};

export default useCurrentUserSubscription;
