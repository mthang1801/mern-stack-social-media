import { Contact } from './contact.model';
import { User } from '../user/user.model';
import getAuthUser from '../utils/getAuthUser';
import { CheckResultAndHandleErrors } from 'apollo-server-express';
import mongoose from 'mongoose';
export const contactControllers = {
  addContact: async (req, receiverId, message, pubsub, contactActions) => {
    const myUserId = getAuthUser(req);
    const checkContactExisting = await Contact.findOne({
      $or: [
        {
          sender: receiverId,
          receiver: myUserId,
        },
        {
          sender: myUserId,
          receiver: receiverId,
        },
      ],
    });
    if (checkContactExisting) {
      throw new CheckResultAndHandleErrors('Unable to add contact');
    }
    const newContact = new Contact({
      sender: myUserId,
      receiver: receiverId,
      message,
    });
    await newContact.save();
    pubsub.publish(contactActions, {
      contactActions: {
        action: 'ADDED',
        node: newContact._doc,
      },
    });
    return true;
  },
  acceptContact: async (req, senderId, pubsub, contactActions) => {
    const myUserId = getAuthUser(req);
    const session = await mongoose.startSession();
    session.startTransaction();
    const contact = await Contact.findOneAndUpdate(
      { sender: senderId, receiver: myUserId },
      { status: true },
      { returnOriginal: false }
    );
    if (!contact) {
      throw new CheckResultAndHandleErrors('Accept contact failed');
    }
    await User.findByIdAndUpdate(myUserId, { $push: { friends: senderId } });
    await User.findByIdAndUpdate(senderId, { $push: { friends: myUserId } });
    pubsub.publish(contactActions, {
      contactActions: {
        action: 'ACCEPTED',
        node: contact,
      },
    });
    await session.commitTransaction();
    session.endSession();
    return true;
  },
};
