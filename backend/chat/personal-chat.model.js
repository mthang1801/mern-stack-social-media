const mongoose = require('mongoose');

const PersonalChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    messageType: {
      type: String,
      enum: ['TEXT', 'IMAGE', 'ATTACHMENT'],
    },
    text: {
      type: String,
    },
    file: {
      data: Buffer,
      mimetype: String,
      filename: String,
    },
    receiverStatus: {
      type: String,
      enum: ['SENT', 'DELIVERED', 'SEEN', 'DELETED'],
      default: 'SENT',
    },
    senderStatus: {
      type: String,
      enum: ['SENT', 'RECALLED', 'DELETED'],
      default: 'SENT',
    },
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

exports.PersonalChat = mongoose.model('personal-chats', PersonalChatSchema);
