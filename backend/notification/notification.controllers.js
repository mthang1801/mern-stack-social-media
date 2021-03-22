import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Notification } from "./notification.model";
import { ValidationError, AuthenticationError } from "apollo-server-express";
export const notificationControllers = {
  fetchNotifications: async (req, skip, limit) => {
    const userId = await getAuthUser(req);
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("User not found");
    }
    const notifications = await Notification.find({ receivers: userId })
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit);
    return notifications;
  },
  updateUserHasSeenNotification : async (req, notificationId, pubsub, updateCountNotificationsWhenSeen) => {
    const userId = await getAuthUser(req);   
    const notification = await Notification.findOne({_id : notificationId, receivers : userId}).populate("creator") ; 
    if(!notification){
      throw new AuthenticationError("You are not allowed to update");
    }
    notification.hasSeen.push(userId);
    await notification.save();     
    pubsub.publish(updateCountNotificationsWhenSeen, {
      updateCountNotificationsWhenSeen : userId
    })
    return notification
  },
  countNotificationsUnseen : async (req) => {
    const userId = await getAuthUser(req); 
    const countNotification = await Notification.countDocuments({receivers : userId, hasSeen : {$ne : userId}});
    return countNotification
  }
};
