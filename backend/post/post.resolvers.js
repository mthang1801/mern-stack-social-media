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
        subscriptionActions.POST_ACTIONS
      ),
    updatePost: (_, args, { req }, info) =>
      postControllers.updatePost(req, args.postId, args.data, pubsub , subscriptionActions.POST_ACTIONS),
    deletePost: (_, args, { req }, info) =>
      postControllers.deletePost(req, args.postId, pubsub, subscriptionActions.POST_ACTIONS),
  },
  Subscription: {
    postActions: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.POST_ACTIONS),
        (payload, {userId}) => {     
          return payload.postActions.node.author._id.toString() === userId.toString()
        }
      ),
    },
  },
};
