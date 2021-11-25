import { withFilter } from 'apollo-server-express';
import { conversationControllers } from './conversation.controller';
export const conversationsResolvers = {
  Query: {
    fetchConversations: (_, { except, limit, skip }, { req }, info) =>
      conversationControllers.fetchConversations(req, except, skip, limit),
  },
};
