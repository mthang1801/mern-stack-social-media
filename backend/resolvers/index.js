const { userResolvers } = require('../user/user.resolvers');
const { postResolvers } = require('../post/post.resolvers');
const { commentResolvers } = require('../comment/comment.resolvers');
const { contactResolvers } = require('../contact/contact.resolvers');
const { chatResolvers } = require('../chat/chat.resolvers');
const {
  notificationResolvers,
} = require('../notification/notification.resolvers');
const {
  conversationsResolvers,
} = require('../conversation/conversation.resovers');
const { responseResolvers } = require('../response/response.resolvers');
const resolvers = [
  userResolvers,
  postResolvers,
  commentResolvers,
  contactResolvers,
  chatResolvers,
  notificationResolvers,
  responseResolvers,
  conversationsResolvers,
];

module.exports = resolvers;
