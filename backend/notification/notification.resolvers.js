const { notificationControllers } = require('./notification.controllers');
const { pubsub } = require('../pubsub');
const { withFilter } = require('apollo-server-express');
const { subscriptionActions } = require('../schema/schema.subscription');
const constant = require('../config/constant');
exports.notificationResolvers = {
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
