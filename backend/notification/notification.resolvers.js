import {notificationControllers} from "./notification.controllers"
export const notificationResolvers = {
  Query : {
    fetchNotifications : (_, args, {req}, info) => notificationControllers.fetchNotifications(req)
  },
  Mutation:  {
    updateUserHasSeenNotification : (_, args, {req}, info) => notificationControllers.updateUserHasSeenNotification(req, args.notificationId)
  }
}