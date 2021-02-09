import mongoose from "mongoose";
export const statusEnum = ["public", "private"]
const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    files: [
      {
        filename : {
          type : String, 
          required : true 
        },
        mimetype : {
          type : String ,
          required : true 
        },
        encoding : {
          type : String,
          required : true 
        }
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
    author : {
      type : String, 
      ref : "users",
      required : true 
    },
    status: {
      type: String,
      enum: statusEnum,
      default: "public",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", PostSchema);
