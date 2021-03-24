import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import { Notification } from "../notification/notification.model";
import mongoose from "mongoose";
import { statusEnum } from "./post.model";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { actions, fields } from "../fields-actions";
import  decodeBase64 from "../utils/decodeBase64"
export const postControllers = {
  fetchPosts: async (req, limit, skip, userId) => {
    const myUserId = getAuthUser(req, false);
    const user = await User.findById(myUserId);
    if (userId) {
      const Posts = await Post.find({
        $and: [
          { author: userId },
          {
            $or: [
              { status: "friends", friends: myUserId },
              { status: "public" },
            ],
          },
        ],
      })
        .populate("mentions")
        .populate("author")
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit);
      return Posts;
    }
    if (user) {
      const friendsID = user.friends;
      const Posts = await Post.find({
        author: { $in: friendsID },
        status: { $in: ["public", "friends"] },
      })
        .populate("author")
        .populate("mentions")
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit);
      return Posts;
    }
    return [];
  },
  createPost: async (req, data) => {
    const { text, mentions, fileNames, fileMimetype, fileEncodings, status } = data;
    const currentUserId = getAuthUser(req);    
    const user = await User.findById(currentUserId, {name : 1, avatar : 1, slug : 1 , isOnline : 1});
    if (!user) {
      throw new AuthenticationError("User not found");
    }
    if (mentions.length) {
      //pubsub notification      
    }
    if (!status || !statusEnum.includes(status)) {
      throw new UserInputError(
        "Mentions has item not match with User's friends"
      );
    }
    //convert base 64 images to buffer
    const decodeBase64FileData = fileEncodings.map(encoding=> {
      const {data} = decodeBase64(encoding);
      return data ; 
    })
    
    let fileData = []
    if(fileNames.length !== fileMimetype.length && fileNames.length !== fileEncodings.length){
      throw new UserInputError("Length of file not correct");
    }    

    for(let i = 0; i < fileNames.length; i++){
      fileData.push({data : decodeBase64FileData[i], mimetype : fileMimetype[i], filename : fileNames[i]});
    }
    const newPost = new Post({
      text, 
      mentions,
      files : fileData, 
      author : currentUserId,
      status 
    })    
    await (await newPost.save()).populate({path : "mentions", select : "name avatar slug isOnline offlinedAt"}).execPopulate();
    console.log({...newPost._doc, author : {...user._doc} })
    return {...newPost._doc, author : {...user._doc} }
  },
  updatePost: async (req, postId, data, pubsub, postActions) => {
    const { text, mentions, tags, images, status } = data;
    if (!title && !content && !status) {
      throw new UserInputError("Update Fail");
    }
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      "author"
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        "Post not found or unable to update"
      );
    }

    post.text = text;
    if (mentions) {
      const friends = user.friends.map((friend) => friend.toString());
      const setFriends = new Set(friends);
      let checkMatch = true;

      mentions.forEach((userId) => {
        checkMatch = setFriends.has(userId.toString()) && checkMatch;
      });
      if (!checkMatch) {
        throw new UserInputError("Mentions is not correct");
      }
      post.mentions = mentions;
    }
    if (images && images.length) {
      post.images = images;
    }
    if (tags) {
      post.tags = tags;
    }
    if (status) {
      post.status = status;
    }
    await (await post.save())
      .populate("author")
      .populate("mentions")
      .execPopulate();
    pubsub.publish(postActions, {
      postActions: {
        action: "UPDATED",
        node: post,
      },
    });
    return post;
  },
  deletePost: async (req, postId, pubsub, postActions) => {
    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, author: userId }).populate(
      "author"
    );
    if (!post) {
      throw new CheckResultAndHandleErrors(
        "Post not found or unable to update"
      );
    }
    await Post.findByIdAndDelete(postId);
    pubsub.publish(postActions, {
      postActions: {
        action: "DELETED",
        node: post,
      },
    });
    return post;
  },
};
