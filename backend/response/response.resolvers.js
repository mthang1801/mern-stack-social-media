import { responseControllers } from "./response.controllers";
import { pubsub } from "../pubsub";
import { subscriptionActions } from "../schema";
import { withFilter } from "apollo-server-express";

export const responseResolvers = {
  Query: {
    fetchResponses: (_, args, { req }, info) =>
      responseControllers.fetchResponses(
        args.commentId,
        args.skip || 0,
        args.limit || +process.env.COMMENTS_PER_POST
      ),
  },
  Mutation: {
    createResponse: (_, args, { req }, info) =>
      responseControllers.createResponse(req, args.commentId, args.data),
    likeResponse: (_, args, { req }, info) =>
      responseControllers.likeResponse(req, args.responseId),
    removeLikeResponse: (_, args, { req }, info) =>
      responseControllers.removeLikeResponse(req, args.responseId),
    removeResponse: (_, args, { req }) =>
      responseControllers.removeResponse(req, args.responseId),
  },
};
