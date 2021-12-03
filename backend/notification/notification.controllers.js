const getAuthUser = require('../utils/getAuthUser');
const { User } = require('../user/user.model');
const { Notification } = require('./notification.model');
const {
  ValidationError,
  AuthenticationError,
} = require('apollo-server-express');
exports.notificationControllers = {
  fetchNotifications: async (req, skip, limit) => {
    const currentUserId = await getAuthUser(req);
    console.log(skip, limit);
    const currentUser = await User.findById(currentUserId).populate({
      path: 'notifications',
      populate: { path: 'creator', select: 'name slug avatar' },
      options: { sort: { createdAt: -1 }, skip, limit },
    });
    if (!currentUser) {
      throw new ValidationError('User not found');
    }
    return currentUser.notifications;
  },
  updateUserHasSeenNotification: async (req, notificationId) => {
    const currentUserId = getAuthUser(req);
    const notification = await Notification.findByIdAndUpdate(
      { _id: notificationId, receiver: currentUserId },
      { hasSeen: true },
      { new: true }
    );
    if (!notification) {
      return false;
    }
    return true;
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
