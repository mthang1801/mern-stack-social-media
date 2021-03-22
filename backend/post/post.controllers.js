import getAuthUser from "../utils/getAuthUser";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import { Notification } from "../notification/notification.model";
import mongoose from "mongoose";
import { statusEnum } from "./post.model";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import {actions, fields} from "../fields-actions"
export const postControllers = {
  fetchPosts: async (req, limit, skip, userId) => {
    const myUserId = getAuthUser(req, false);    
    const user = await User.findById(myUserId);
    if (userId) {
      const Posts = await Post.find({
        $and: [
          { author: userId },
          {
            $or: [{ status: "friends", friends: myUserId }, { status: "public" }],
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
  createPost: async (req, data, pubsub, notifyCreatedPost) => {
    const {
      text,
      mentions,
      fileNames,
      fileMimetype,
      fileEncoding,
      status,
    } = data;
    const userId = getAuthUser(req);
    const user = await User.findById(userId);
    if (!user) {
      throw new AuthenticationError("User not found");
    }
    const postData = {
      text,
    };

    if (mentions && mentions.length) {
      // Check mention item has match with user's friends
      const friends = user.friends.map((friend) => friend.toString());

      const setFriends = new Set(friends);
      let checkMentionsIsMatchUserFriend = true;
      mentions.forEach((userId) => {
        checkMentionsIsMatchUserFriend =
          setFriends.has(userId.toString()) && checkMentionsIsMatchUserFriend;
      });

      if (!checkMentionsIsMatchUserFriend) {
        throw new UserInputError(
          "Mentions has item not match with User's friends"
        );
      }
      postData.mentions = mentions;
    }
    if (status && status in statusEnum) {
      postData.status = status;
    }
    if (
      fileNames &&
      fileNames.length &&
      fileEncoding &&
      fileEncoding.length &&
      fileMimetype &&
      fileMimetype.length &&
      fileNames.length === fileEncoding.length &&
      fileNames.length === fileMimetype.length
    ) {
      let files = [];
      for (let i = 0; i < fileNames.length; i++) {
        files.push({
          filename: fileNames[i],
          mimetype: fileMimetype[i],
          encoding: fileEncoding[i],
        });
      }
      postData.files = files;
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    const newPost = new Post({
      ...postData,
      author: userId,
    });

    const newNotification = new Notification({
      field: fields.post,
      action: actions.CREATED,
      creator: userId,
      receivers: user.friends,
      href: `/${userId}/posts/${newPost._id}`,
    });
    user.posts.push(newPost._id);
    for (let friendId of user.friends) {
      const friend = await User.findById(friendId);
      if (friend) {
        friend.notifications.push(newNotification._id);
        await friend.save();
      }
    }
    await user.save();
    await (await newPost.save())
      .populate("author")
      .populate("mentions")
      .execPopulate();
    await (await newNotification.save()).populate("creator").execPopulate();
    pubsub.publish(notifyCreatedPost, {
      notifyCreatedPost: {
        field: fields.post,
        action: actions.CREATED,
        sender : user,
        receivers: user.friends,
        notification: newNotification,
      },
    });
    await session.commitTransaction();
    session.endSession();
    return newPost;
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
