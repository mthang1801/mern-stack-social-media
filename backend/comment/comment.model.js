import mongoose from "mongoose" ;

const CommentSchema = new mongoose.Schema({
  content :{
    type : String , 
    required : true 
  }, 
  author : { 
    type : mongoose.Schema.Types.ObjectId, 
    ref : "users" ,
    required : true 
  },
  post : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : "posts", 
    required : true 
  }
},{timestamps : true})

export const Comment = mongoose.model("comments", CommentSchema)