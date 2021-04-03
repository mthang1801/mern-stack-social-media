import {Response} from "./response.model"
import getAuthUser from "../utils/getAuthUser"
import { User } from "../user/user.model";
import {Comment} from "../comment/comment.model"
import {Post} from "../post/post.model"
import {Notification} from "../notification/notification.model"
import {ApolloError, AuthenticationError, ValidationError} from "apollo-server-express"
import {fields, actions} from "../fields-actions"
import mongoose from "mongoose"
export const responseControllers = {
  fetchResponses : async (commentId, skip, limit) => {
    try {
      console.log(commentId, skip, limit)
      const comment = await Comment.findById(commentId).populate({path : "responses", populate : {path : "author", select : "name avatar slug"}, options : {sort : {createdAt : -1}, skip,limit}});
    return comment.responses
    } catch (error) {
      console.log(error)
      throw new ApolloError(error.message);
    }
  },
  createResponse : async (req, commentId, data) => {
    try {
      const {text, mentions} =data ; 
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId);
      if(!currentUser){
        throw new AuthenticationError("User not found");
      }
      const comment = await Comment.findById(commentId);
      if(!comment){
        throw new ValidationError("Comment not found");
      }
      const post = await Post.findById(comment.post);

      const newResponse = new Response({
        text, 
        mentions, 
        post : post._id, 
        author : currentUserId,
        comment: commentId
      })
      
      const session = await mongoose.startSession()
      session.startTransaction();
      //push new responses to user
      currentUser.responses.push(newResponse._id);
      await currentUser.save();
      
      //push new response to comment
      comment.responses.push(newResponse._id);
      await comment.save(); 

      //push new response to post
      post.responses.push(newResponse._id);
      await post.save();

      if(mentions.length){
          //create notification to mentions in response
          const newNotification = new Notification({
            field: fields.response,
            action: actions.MENTION,
            creator: currentUserId,
            receivers: mentions,
            href: `/posts/${post._id}?comment=${comment._id}`,
          }); 
          for(let mentionId of mentions){
            const mentioner = await User.findById(mentionId);
            mentioner.notifications.push(newNotification._id);
            await mentioner.save();
          }
          await (await newNotification.save())
            .populate("creator")
            .execPopulate();
          //pubsub
      }

      await (await newResponse.save()).populate({path : "author", select : "name avatar slug isOnline offlinedAt"}).execPopulate();
      await session.commitTransaction();
      session.endSession();
      return newResponse;
    } catch (error) {
      console.log(error);
    }
  }
}