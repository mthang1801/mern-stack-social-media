const { ApolloError } = require('apollo-server-express');
const getAuthUser = require('../utils/getAuthUser');

exports.conversationControllers = {
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
