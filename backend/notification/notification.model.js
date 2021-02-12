import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  field : {
    type : String , 
    required : true 
  },
  action : {
    type : String ,
    required : true 
  },
  creator : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users", 
    required : true 
  }, 
  receivers : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "users", 
      required : true 
    }
  ],
  href : {
    type : String ,
    required : true
  },
  hasSeen : {
    type : Boolean, 
    default : false 
  },  
  acceptInvite : {
    type : Boolean,
    default : false 
  }  
},{timestamps: true})

const Notification = mongoose.model("notifications", NotificationSchema);

export {Notification}