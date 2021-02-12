import getAuthUser from "../utils/getAuthUser"
import {User} from "../user/user.model"
import {Notification} from "./notification.model"
import {ValidationError} from "apollo-server-express"
export const notificationControllers ={
  fetchNotifications : async (req) => {   
    console.time("Start") 
    const userId = await getAuthUser(req);
    const user = await User.findById(userId);
    if(!user){
      throw new ValidationError("User not found");
    }    
    const notifications = await Notification.find({receivers : userId}).populate("creator").sort({createdAt : -1})
    console.timeEnd("Start") 
    return notifications
  }
}