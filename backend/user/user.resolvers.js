import {userController} from "./user.controllers"
import {pubsub} from "../pubsub"
import {subscriptionActions} from "../schema/index"
import {withFilter} from "apollo-server-express"
export const userResolvers = {
  Query : {
    users : (_, args, ctx, info) => {
      return userController.users()
    },
    loginUser : (_, args, ctx, info) => {
      return userController.loginUser(args.data)
    },
    fetchCurrentUser : (_, args, {req}, info) => {     
      return userController.fetchCurrentUser(req)
    },
    fetchPersonalUser : (_, args, {req}, info)  => {
      return userController.fetchPersonalUser(req, args.slug)
    }
  },
  Mutation : {
    createUser : (_, args, ctx, info) => {
      return userController.createUser(args.data)
    },
    sendRequestToAddFriend : (_, args, {req}, info) => {
      return userController.sendRequestToAddFriend(req, args.userId, pubsub, subscriptionActions.NOTIFY_RECEIVE_ADD_FRIEND);
    },
    rejectRequestToAddFriend : (_, args, {req}, info) => {
      return userController.rejectRequestToAddFriend(req, args.userId);
    }
  },
  User : {
    password : (_, args, ctx, info) => userController.hidePassword()
  },
  Subscription : {
    notifyReceiveAddFriend : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.NOTIFY_RECEIVE_ADD_FRIEND),
        (payload, {userId}) => {          
          return payload.notifyReceiveAddFriend.receiver.toString() === userId.toString()
        }
      )
    }
  }
}