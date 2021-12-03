const { checkStatusConversation } = require('./checkStatusConversation');
exports.initSockets = (io) => {
  checkStatusConversation(io);
};
