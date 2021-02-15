import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Notification } from "./notification.model";
import { ValidationError, AuthenticationError } from "apollo-server-express";
export const notificationControllers = {
  fetchNotifications: async (req) => {
    const userId = await getAuthUser(req);
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("User not found");
    }
    const notifications = await Notification.find({ receivers: userId })
      .populate("creator")
      .sort({ createdAt: -1 });
    return notifications;
  },
  updateUserHasSeenNotification : async (req, notificationId) => {
    const userId = await getAuthUser(req);
    console.log(userId)
    const notification = await Notification.findOne({_id : notificationId, receivers : userId}).populate("creator") ; 
    if(!notification){
      throw new AuthenticationError("You are not allowed to update");
    }
    notification.hasSeen.push(userId);
    await notification.save();     
    return notification
  }
};
