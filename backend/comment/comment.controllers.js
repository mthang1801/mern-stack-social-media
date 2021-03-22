import getAuthUser from "../utils/getAuthUser"
import {CheckResultAndHandleErrors, UserInputError} from "apollo-server-express"
import mongoose from "mongoose";
import {Post} from "../post/post.model"
import {Comment} from "./comment.model"
import {User} from "../user/user.model";
export const commentControllers = {
  createComment : async (req, postId, data, pubsub, commentActions) => {
    const {content} = data;     
    const userId = getAuthUser(req);
    const post = await Post.findById(postId);
    if(!post){
      throw new CheckResultAndHandleErrors("Post not found")
    }
    const user = await User.findById(userId);
    const newComment = new Comment({
      content, 
      author : userId , 
      post : postId
    })    
    const session = await mongoose.startSession();
    session.startTransaction();    
    user.comments.push(newComment._id);
    await user.save();
    post.comments.push(newComment._id);
    await post.save();
    await (await newComment.save()).populate("author").populate("post").execPopulate();
    pubsub.publish(commentActions, {
      commentActions :{
        action : "CREATED", 
        node : newComment
      }
    })
    await session.commitTransaction();
    session.endSession()    
    return newComment
  },
  updateComment : async (req, commentId, data, pubsub, commentActions) => {
    const {content} = data ; 
    if(!content){
      throw new UserInputError("Update Comment failed.");
    }
    const userId = getAuthUser(req) ; 
    const comment = await Comment.findOne({_id : commentId, author : userId}).populate("author").populate("post");
    if(!comment){
      throw new CheckResultAndHandleErrors("Comment not found or unable to update");
    }
    comment.content = content; 
    await comment.save();
    pubsub.publish(commentActions, {
      commentActions : {
        action : "UPDATED",
        node : comment
      }
    })
    return comment ; 
  },
  deleteComment :async (req, commentId, pubsub, commentActions) => {
    const userId = getAuthUser(req);
    const comment = await Comment.findOne({_id : commentId, author : userId}).populate("post").populate("author");
    if(!comment){
      throw new CheckResultAndHandleErrors("Comment not found or unable to delete");
    }
    await Comment.findByIdAndDelete(commentId);
    pubsub.publish(commentActions, {
      commentActions : {
        action : "DELETED",
        node : comment 
      }
    })
    return comment ;
  }
}