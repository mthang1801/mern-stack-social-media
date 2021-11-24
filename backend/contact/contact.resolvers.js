import { contactControllers } from './contact.controllers';
import { withFilter } from 'apollo-server';
import { pubsub } from '../pubsub';
import { subscriptionActions } from '../schema';
export const contactResolvers = {
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
