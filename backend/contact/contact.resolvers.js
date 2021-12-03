const { contactControllers } = require('./contact.controllers');
const { withFilter } = require('apollo-server');
const { pubsub } = require('../pubsub');
const { subscriptionActions } = require('../schema');
exports.contactResolvers = {
  Mutation: {
    addContact: (_, args, { req }, info) =>
      contactControllers.addContact(
        req,
        args.receiverId,
        args.message,
        pubsub,
        subscriptionActions.CONTACT_ACTIONS
      ),
    acceptContact: (_, args, { req }, info) =>
      contactControllers.acceptContact(
        req,
        args.senderId,
        pubsub,
        subscriptionActions.CONTACT_ACTIONS
      ),
  },
  Subscription: {
    contactActions: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(subscriptionActions.CONTACT_ACTIONS),
        (payload, { userId }) => {
          const { node } = payload.contactActions;
          return (
            node.sender.toString() === userId.toString() ||
            node.receiver.toString() === userId.toString()
          );
        }
      ),
    },
  },
};
