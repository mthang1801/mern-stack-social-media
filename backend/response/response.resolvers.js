import { responseControllers } from "./response.controllers";
import { pubsub } from "../pubsub";
import { subscriptionActions } from "../schema";
import { withFilter } from "apollo-server-express";

export const responseResolvers = {
  Mutation : {
    createResponse : (_, args, {req} ,info) => responseControllers.createResponse(req, args.commentId, args.data)
  }
}