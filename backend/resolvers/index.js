import { userResolvers } from "../user/user.resolvers";
import { postResolvers } from "../post/post.resolvers";
import { commentResolvers } from "../comment/comment.resolvers";
import { contactResolvers } from "../contact/contact.resolvers";
import { chatResolvers } from "../chat/chat.resolvers";
import { notificationResolvers } from "../notification/notification.resolvers";
import { responseResolvers } from "../response/response.resolvers";
const resolvers = [
  userResolvers,
  postResolvers,
  commentResolvers,
  contactResolvers,
  chatResolvers,
  notificationResolvers,
  responseResolvers
];

export default resolvers;
