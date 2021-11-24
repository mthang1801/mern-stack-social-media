import { notificationControllers } from './notification.controllers';
import { pubsub } from '../pubsub';
import { withFilter } from 'apollo-server-express';
import { subscriptionActions } from '../schema';
import constant from '../config/constant';
export const notificationResolvers = {
  Query: {
    fetchNotifications: (_, args, { req }, info) =>
      notificationControllers.fetchNotifications(
        req,
        args.skip || 0,
        args.limit || constant.NOTIFICATIONS_PER_PAGE
      ),
    countNotificationsUnseen: (_, args, { req }, info) =>
      notificationControllers.countNotificationsUnseen(req),
  },
  Mutation: {
    updateUserHasSeenNotification: (_, args, { req }, info) =>
      notificationControllers.updateUserHasSeenNotification(
        req,
        args.notificationId
      ),
  },
};
