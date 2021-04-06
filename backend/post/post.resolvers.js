import { postControllers } from "./post.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const postResolvers = {
  Query: {
    fetchPosts: (_, args, { req }, info) => {
      return postControllers.fetchPosts(
        req,
        args.userId || null,
        args.skip || 0,
        args.limit || +process.env.POSTS_PER_PAGE
      );
    },
  },
  Mutation: {
    createPost: (_, args, { req }, info) =>
      postControllers.createPost(
        req,
        args.data,
        pubsub,
        subscriptionActions.NOTIFY_MENTIONED_USERS_IN_POST
      ),
    likePost: (_, args, { req }, info) =>
      postControllers.likePost(
        req,
        args.postId,
        pubsub,
        subscriptionActions.LIKE_POST_SUBSCRIPTION
      ),
    removeLikePost: (_, args, { req }, info) =>
      postControllers.removeLikePost(req, args.postId, pubsub, subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION),
  },
  Subscription: {
    notifyMentionUsersInPost: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTIONED_USERS_IN_POST
          ),
        (payload, { userId }) => {
          return payload.notifyMentionUsersInPost.receiver.toString() === userId.toString()
        }
      ),
    },
    likePostSubscription: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.LIKE_POST_SUBSCRIPTION
          ),
        (payload, { userId }) => {
          return payload.likePostSubscription.receiver.toString() === userId.toString();
        }
      ),
    },
    removeLikePostSubscription : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.REMOVE_LIKE_POST_SUBSCRIPTION),
        (payload, {userId}) => {
          return payload.removeLikePostSubscription.receiver.toString() === userId.toString()
        }
      )
    }
  },
};
