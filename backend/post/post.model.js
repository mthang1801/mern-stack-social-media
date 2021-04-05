import mongoose from "mongoose";
export const statusEnum = ["public", "private", "friends", "PUBLIC", "PRIVATE", "FRIENDS"]
const PostSchema = new mongoose.Schema(
  {   
    text: {
      type: String,      
    },           
    shortenText : {
      type : String,       
    },
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
        data : {
          type : Buffer, 
          required : true 
        }
      }
    ],
    usersComment : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
      }
    ],
    likes : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
    responses : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "responses", 
        required : true 
      }
    ],
    author : {
      type : mongoose.Schema.Types.ObjectId, 
      ref : "users",
      required : true 
    },
    status: {
      type: String,
      enum: statusEnum,
      default: "PUBLIC",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", PostSchema);
