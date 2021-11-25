import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema(
  {
    sender: {
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
    messageType: {
      type: String,
      enum: ['TEXT', 'IMAGE', 'ATTACHMENT'],
    },
    text: String,
    file: [
      {
        data: Buffer,
        mimetype: String,
        filename: String,
      },
    ],
    receiversStatus: [
      {
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        status: {
          type: String,
          enum: ['UNRECEIVED', 'RECEIVED', 'SEEN', 'DELETED'],
          default: 'UNRECEIVED',
        },
      },
    ],
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

export const Messages = mongoose.model('messages', MessagesSchema);
