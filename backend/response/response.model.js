import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  text : {
    type : String ,     
  },
  mentions : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "users",
      required : true 
    }
  ],
  file:  {
    data : Buffer,
    mimetype : String,
    filename : String
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users",
    required : true
  },
  post : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "responses", 
    required : true 
  },
  comment : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "comments", 
    required : true 
  },
  likes : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "users",
      required:  true
    }
  ],
  
}, {timestamps : true})

export const Response = mongoose.model("responses", ResponseSchema);