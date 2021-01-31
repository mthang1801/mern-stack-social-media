import getAuthUser from "../../utils/getAuthUser"
import {PrivateChat} from "./private-chat.model"
import {User} from "../../user/user.model"
import {CheckResultAndHandleErrors} from "apollo-server-express"
export const privateChatControllers = {
  addPrivateChat : async  (req, receiverId, text, pubsub, privateChatActions) => {
    const userId = getAuthUser(req) ; 
    const newPrivateChat = new PrivateChat({
      sender : userId, 
      receiver : receiverId, 
      text       
    })
    await (await newPrivateChat.save()).populate("sender").populate("receiver").execPopulate();
    pubsub.publish(privateChatActions , {
      privateChatActions : {
        action : "SEND", 
        node : newPrivateChat
      }
    })
    return newPrivateChat
  }
}