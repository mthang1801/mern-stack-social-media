import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    mentions : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required :true
      }
    ],
    file: {
      data: Buffer,
      mimetype: String,
      filename: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }],
    subComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comments", CommentSchema);
