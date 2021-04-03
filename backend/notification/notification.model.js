import mongoose from "mongoose";
import {fields, actions} from "../fields-actions"
const NotificationSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
      enum : Object.values(fields)
    },
    action: {
      type: String,
      required: true,
      enum : Object.values(actions)
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fieldId: {
      comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment"
      },
      post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts"
      }, 
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
      },      
    },

    receivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    href: {
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
    acceptInvite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notifications", NotificationSchema);

export { Notification };
