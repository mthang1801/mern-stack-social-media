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
        subscriptionActions.NOTIFY_MENTION_USERS_IN_POST
      ),
    likePost: (_, args, { req }, info) =>
      postControllers.likePost(
        req,
        args.postId,
        pubsub,
        subscriptionActions.NOTIFY_OWNER_POST_USER_LIKE_POST
      ),
    unlikePost: (_, args, { req }, info) =>
      postControllers.unlikePost(req, args.postId),
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
    notifyMentionUsersInPost: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_MENTION_USERS_IN_POST
          ),
        (payload, { userId }) => {
          return payload.notifyMentionUsersInPost.receivers.includes(
            userId.toString()
          );
        }
      ),
    },
    notifyUserLikePost: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(
            subscriptionActions.NOTIFY_OWNER_POST_USER_LIKE_POST
          ),
        (payload, { userId }) => {
          return payload.notifyUserLikePost.receivers.includes(userId);
        }
      ),
    },
  },
};
