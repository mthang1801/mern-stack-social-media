import { postControllers } from "./post.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const postResolvers = {
  Query: {
    fetchPosts: (_, args, { req }, info) => {
      return postControllers.fetchPosts(
        req,
        args.limit || +process.env.POSTS_PER_PAGE,
        args.skip || 0,
        args.userId || null
      );
    },
  },
  Mutation: {
    createPost: (_, args, { req }, info) =>
      postControllers.createPost(req, args.data),
  },
  Subscription: {
    notifyCreatedPost: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.NOTIFY_POST_CREATED),
        (payload, { userId }) => {
          return userId
            ? payload.notifyCreatedPost.receivers.includes(userId.toString())
            : false;
        }
      ),
    },
  },
};
