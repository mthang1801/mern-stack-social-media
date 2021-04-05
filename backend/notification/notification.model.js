import mongoose from "mongoose";
import { fields, contents } from "./index";
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
      ref: "users",
      required: true,
    },
    fieldIdentity: {
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      response: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "responses",
      },
    },

    receivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    url: {
      type: String,
      required: true,
    },
    hasSeen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
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

const Notification = mongoose.model("notifications", NotificationSchema);

export { Notification };
