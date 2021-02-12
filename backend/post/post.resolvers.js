import { postControllers } from "./post.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const postResolvers = {
  Query: {
    fetchPosts: (_, args, { req }, info) => postControllers.fetchPosts(req, args.skip = 0 ),        
  },
  Mutation: {
    createPost: (_, args, { req }, info) =>    
      postControllers.createPost(
        req,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_POST_CREATED
      ),   
  },
  Subscription: {
    notifyCreatedPost: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.NOTIFY_POST_CREATED),
        (payload, {userId}) => {       
          console.log(payload)        
          return userId ? payload.notifyCreatedPost.users.includes(userId.toString()) : false
        }
      ),
    },
  },
};
