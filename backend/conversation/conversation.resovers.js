const { withFilter } = require('apollo-server-express');
const { conversationControllers } = require('./conversation.controller');
exports.conversationsResolvers = {
  Query: {
    fetchConversations: (_, { except, limit, skip }, { req }, info) =>
      conversationControllers.fetchConversations(req, except, skip, limit),
  },
};
