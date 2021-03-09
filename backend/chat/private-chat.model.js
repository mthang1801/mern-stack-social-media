import mongoose from "mongoose";

const PrivateChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["TEXT", "BLOB"],
    },
    text: {
      type: String,
    },
    file: {
      encoding: Buffer,
      mimetype: String,
      filename: String,
    },
    receiverStatus: {
      type: String,
      enum: ["SENT", "DELIVERED", "SEEN", "DELETED"],
      default: "SENT",
    },
    senderStatus: {
      type: String,
      enum: ["SENT", "RECALLED", "DELETED"],
      default: "SENT",
    },
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const PrivateChat = mongoose.model("private-chats", PrivateChatSchema);