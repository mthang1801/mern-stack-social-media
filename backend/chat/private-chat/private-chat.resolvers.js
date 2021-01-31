import {privateChatControllers} from "./private-chat.controllers"
import {pubsub} from "../../pubsub";
import {withFilter} from "apollo-server-express"
import {subscriptionActions} from "../../schema"
export const privateChatResolvers = {
  Mutation : {
    addPrivateChat : (_, args, {req}, info) => privateChatControllers.addPrivateChat(req, args.receiverId, args.text, pubsub, subscriptionActions.PRIVATE_CHAT_ACTIONS)
  },
  Subscription : {
    privateChatActions : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.PRIVATE_CHAT_ACTIONS), 
        (payload, userId) => {
          const {action, node} = payload.privateChatActions
          console.log(payload )
          return true 
        }
      )
    }
  }
}