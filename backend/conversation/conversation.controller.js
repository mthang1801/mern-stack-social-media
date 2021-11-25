import { ApolloError } from 'apollo-server-express';
import getAuthUser from '../utils/getAuthUser';

export const conversationControllers = {
  fetchConversations: async (req, except, skip, limit) => {
    try {
      let objectedExcept = {};
      for (let exceptItem of except) {
        objectedExcept[exceptItem] = true;
      }
    } catch (error) {
      throw new ApolloError(`Something went wrong : ${error.message}`);
    }
  },
};
