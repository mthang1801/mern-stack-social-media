import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Notification } from "./notification.model";
import { ValidationError, AuthenticationError } from "apollo-server-express";
export const notificationControllers = {
  fetchNotifications: async (req, skip, limit) => {
    const currentUserId = await getAuthUser(req);
    
    const currentUser = await User.findById(currentUserId).populate({
      path: "notifications",
      populate : [{path : "fieldIdentity.post", select : "shortenText"},{path : "creator", select: "name slug avatar"}],
      options: { sort: { createdAt: -1 }, skip, limit },
    });        
    if (!currentUser) {
      throw new ValidationError("User not found");
    }        
    return currentUser.notifications;
  },
  updateUserHasSeenNotification: async (
    req,
    notificationId,   
  ) => {
    const currentUserId = getAuthUser(req);
    const notification = await Notification.findByIdAndUpdate({_id : notificationId, receiver : currentUserId}, {hasSeen : true}, {new : true});
    if(!notification){
      return false ; 
    }
    return true ; 
  },
  countNotificationsUnseen: async (req) => {
    const userId = await getAuthUser(req);
    const countNotification = await Notification.countDocuments({
      receiver: userId,
      hasSeen: false,
    });
    return countNotification;
  },
};
