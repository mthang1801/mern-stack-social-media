import {commentControllers} from "./comment.controllers"
import {pubsub} from "../pubsub";
import {subscriptionActions} from "../schema"
import {withFilter} from "apollo-server-express"
export const commentResolvers = {
  Mutation : {
    createComment : (_, args, {req}, info) => commentControllers.createComment(req, args.postId, args.data, pubsub, subscriptionActions.COMMENT_ACTIONS),
    updateComment : (_, args, {req}, info) => commentControllers.updateComment(req, args.commentId, args.data,  pubsub, subscriptionActions.COMMENT_ACTIONS),
    deleteComment : (_, args, {req}, info) => commentControllers.deleteComment(req, args.commentId, pubsub, subscriptionActions.COMMENT_ACTIONS)
  },
  Subscription : {
    commentActions : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.COMMENT_ACTIONS),
        (payload, {postId}) => payload.commentActions.node.post._id.toString() === postId.toString()
      )
    }
  }
}