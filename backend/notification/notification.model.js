const mongoose = require('mongoose');
const { contents } = require('./notification.contents');
const { fields } = require('./notification.fields');
const NotificationSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
      enum: Object.values(fields),
    },
    content: {
      type: String,
      required: true,
      enum: Object.values(contents),
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    fieldIdentity: {
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      response: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responses',
      },
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    url: {
      type: String,
      required: true,
    },
    hasSeen: {
      type: Boolean,
      default: false,
    },

    isQuestion: {
      type: Boolean,
      default: false,
    },
    questionType: {
      yesNoQuestion: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

exports.Notification = mongoose.model('notifications', NotificationSchema);
