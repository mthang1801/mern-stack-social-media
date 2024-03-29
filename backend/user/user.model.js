const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default: '/images/avatar-default.png',
    },
    google: {
      uid: String,
      familyName: String,
      givenName: String,
    },
    facebook: {
      uid: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    followed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    sentRequestToAddFriend: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    receivedRequestToAddFriend: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true,
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notifications',
        required: true,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
        required: true,
      },
    ],
    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responses',
        required: true,
      },
    ],
    blocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    conversations: [
      {
        conversationId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'conversations.conversationScope',
        },
        latestMessage: {
          type: Number,
          default: Date.now,
        },
        conversationScope: {
          type: String,
          requried: true,
          enum: ['users', 'groups'],
        },
      },
    ],

    isOnline: {
      type: Boolean,
      default: false,
    },
    offlinedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model('users', UserSchema);
