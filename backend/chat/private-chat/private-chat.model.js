import mongoose from "mongoose"

const PrivateChatSchema = new mongoose.Schema({
   sender : {
     type : mongoose.Schema.Types.ObjectId, 
     ref : "users",
     required : true 
   }, 
   receiver : {
     type : mongoose.Schema.Types.ObjectId,
     ref : "users", 
     required : true 
   },
   text : {
     type : String , 
     required : true 
   },
   status : {
     type : String , 
     enum : ["SEND", "DELETE", "RECALL"],
     default : "SEND"
   }   
}, {timestamps : true})

export const PrivateChat = mongoose.model("private-chats" , PrivateChatSchema)