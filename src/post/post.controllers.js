import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import mongoose from "mongoose";
import {
  CheckResultAndHandleErrors,
  UserInputError,
} from "apollo-server-express";
import { pubsub } from "../pubsub";
export const postControllers = {
  posts: async (req, query) => {
    const userId = getAuthUser(req);
    let PostFilter;
    let MyPost;
    if (query) {
      PostFilter = await Post.find({
        $or: [
          { title: new RegExp(`${query}`, "i") },
          { content: new RegExp(`${query}`, "i") },
        ],
        status: "public",
        author: { $ne: userId },
      }).populate("author");
      MyPost = await Post.find({
        $or: [
          {
            $and: [{ title: new RegExp(query, "i") }, { author: userId }],
          },
          {
            $and: [{ content: new RegExp(query, "i") }, { author: userId }],
          },
        ],
      }).populate("author");
    } else {
      PostFilter = await Post.find({
        author: { $ne: userId },
        status: "public",
      }).populate("author");
      MyPost = await Post.find({
        author: userId,
      }).populate("author");
    }
    return MyPost.concat(PostFilter);
  },
  createPost: async (req, data, pubsub, postActions) => {
    const { title, content, status } = data;
    const userId = getAuthUser(req);
    const user = await User.findById(userId);
    if (!user) {
      throw CheckResultAndHandleErrors("User not found");
    }
    const post = {
      title,
      content,
    };
    if (status) {
      post.status = status;
    }
    const newPost = new Post({
      ...post,
      author: userId,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    // save new post and then query this post with refering author
    user.posts.push(newPost._id);
    await user.save();
    await (await newPost.save()).populate("author").execPopulate();
    pubsub.publish(postActions, {
      postActions: {
        action: "CREATED",
        node: newPost,
      },
    });
    await session.commitTransaction();
    session.endSession();
    return newPost;
  },
  updatePost: async (req, postId, data, pubsub, postActions) => {
    const { title, content, status } = data;
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

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (status) {
      post.status = status;
    }
    await post.save();
    pubsub.publish(postActions, {
      postActions : {
        action : "UPDATED",
        node : post
      }
    })
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
      postActions : {
        action : "DELETED", 
        node : post
      }
    })
    return post;
  },
};
