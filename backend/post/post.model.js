import mongoose from 'mongoose';
export const POST_STATUS_ENUM = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  FRIENDS: 'FRIENDS',
};
const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    shortenText: {
      type: String,
    },
    rawText: {
      type: String,
    },
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    files: [
      {
        filename: {
          type: String,
          required: true,
        },
        mimetype: {
          type: String,
          required: true,
        },
        data: {
          type: Buffer,
          required: true,
        },
      },
    ],
    usersComment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(POST_STATUS_ENUM),
      default: 'PUBLIC',
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('posts', PostSchema);
