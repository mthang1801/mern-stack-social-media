import { notificationControllers } from "./notification.controllers";
import { pubsub } from "../pubsub";
import { withFilter } from "apollo-server-express";
import { subscriptionActions } from "../schema";
export const notificationResolvers = {
  Query: {
    fetchNotifications: (_, args, { req }, info) =>
      notificationControllers.fetchNotifications(
        req,        
        args.skip || 0,
        args.limit || +process.env.POSTS_PER_PAGE,
      ),
      countNotificationsUnseen : (_, args , {req}, info) => notificationControllers.countNotificationsUnseen(req)
  },
  Mutation: {
    updateUserHasSeenNotification: (_, args, { req }, info) =>
      notificationControllers.updateUserHasSeenNotification(
        req,
        args.notificationId,
        pubsub,
        subscriptionActions.UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN
      ),
  },
  Subscription:  {
    updateCountNotificationsWhenSeen : {
      subscribe : withFilter(
        () => pubsub.asyncIterator(subscriptionActions.UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN),
        (payload, {userId}) => {          
          return payload.updateCountNotificationsWhenSeen.toString() === userId.toString()
        }
      )
    }
  }
};
