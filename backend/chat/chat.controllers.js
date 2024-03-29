const getAuthUser = require('../utils/getAuthUser');
const { PersonalChat } = require('./personal-chat.model');
const { User } = require('../user/user.model');
const { ApolloError, UserInputError } = require('apollo-server-express');
const _ = require('lodash');
const decodeBase64 = require('../utils/decodeBase64');
const mongoose = require('mongoose');
const constant = require('../config/constant');

exports.chatControllers = {
  fetchChatConversations: async (req, except, skip, limit) => {
    //when fetch chat messages, we need update status is delivered message is delivered if it is on sent status
    try {
      console.time('fetchChatConversations');
      //convert except to Object
      const _exceptToObject = {};
      for (let item of except) {
        _exceptToObject[item] = true;
      }
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId);
      const { conversations } = currentUser;
      console.log(conversations);
      if (conversations.length) {
        const sortedConversations = _.sortBy(
          conversations,
          (o) => -o.latestMessage
        ).slice(skip, limit + skip);
        let conversationsResult = [];
        for (let conversation of sortedConversations) {
          const { isGroup, conversationId } = conversation;
          let getConversations;
          let scope; //["PERSONAL", "GROUP"]
          if (_exceptToObject[conversationId.toString()]) {
            continue;
          }
          if (isGroup) {
            //here is GROUP conversation
            // do later with group chat
            scope = 'GROUP';
            continue;
          } else {
            // here is PERSONAL conversation
            getConversations = await PersonalChat.find({
              $or: [
                { sender: currentUserId, receiver: conversationId },
                { sender: conversationId, receiver: currentUserId },
              ],
            })
              .populate({
                path: 'sender',
                select: 'name slug avatar isOnline offlinedAt',
              })
              .populate({
                path: 'receiver',
                select: 'name slug avatar isOnline offlinedAt',
              })
              .sort({ createdAt: -1 })
              .skip(+skip)
              .limit(+limit);
            getConversations = getConversations.map((conversation) => {
              const _messages = conversation._doc;
              if (
                _messages.messageType === 'IMAGE' ||
                _messages.messageType === 'ATTACHMENT'
              ) {
                return {
                  ..._messages,
                  file: {
                    ..._messages.file,
                    data: `data:${
                      _messages.file.mimetype
                    };base64,${_messages.file.data.toString('base64')}`,
                  },
                };
              }
              return { ..._messages };
            });
            scope = 'PERSONAL';
          }

          if (getConversations.length) {
            const profile =
              getConversations[0].sender._id.toString() ===
              conversationId.toString()
                ? getConversations[0].sender
                : getConversations[0].receiver;
            const latestMessage = getConversations[0];
            const hasSeenLatestMessage =
              latestMessage.receiver._id.toString() ===
                currentUserId.toString() &&
              latestMessage.receiverStatus !== 'SEEN'
                ? false
                : true;
            conversationsResult = [
              ...conversationsResult,
              {
                profile,
                messages: [...getConversations.reverse()],
                scope,
                latestMessage,
                hasSeenLatestMessage,
              },
            ];
          }
        }
        console.timeEnd('fetchChatConversations');
        return {
          conversations: conversationsResult,
          numberOfConversations: conversations.length,
        };
      }
      return {
        conversations: [],
        numberOfConversations: 0,
      };
    } catch (error) {
      console.log(`102-${error}`);
      throw new ApolloError('Server error');
    }
  },
  fetchMessages: async (req, conversationId, scope, skip, limit) => {
    try {
      const currentUserId = getAuthUser(req);
      if (scope === 'PERSONAL') {
        const numberMessages = await PersonalChat.countDocuments({
          $or: [
            { sender: currentUserId, receiver: conversationId },
            { sender: conversationId, receiver: currentUserId },
          ],
        });
        if (numberMessages <= skip) {
          return {
            messages: [],
          };
        }
        let personalMessages = await PersonalChat.find({
          $or: [
            { sender: currentUserId, receiver: conversationId },
            { sender: conversationId, receiver: currentUserId },
          ],
        })
          .populate({
            path: 'sender',
            select: 'name slug avatar isOnline offlinedAt',
          })
          .populate({
            path: 'receiver',
            select: 'name slug avatar isOnline offlinedAt',
          })
          .sort({ createdAt: -1 })
          .skip(+skip)
          .limit(+limit);
        personalMessages = personalMessages.map((message) => {
          const _messages = message._doc;
          if (
            _messages.messageType === 'IMAGE' ||
            _messages.messageType === 'ATTACHMENT'
          ) {
            return {
              ..._messages,
              file: {
                ..._messages.file,
                data: `data:${
                  _messages.file.mimetype
                };base64,${_messages.file.data.toString('base64')}`,
              },
            };
          }
          return { ..._messages };
        });

        return {
          messages: personalMessages.reverse(),
        };
      } else if (scope === 'GROUP') {
      } else {
        throw new UserInputError('invalid scope');
      }
    } catch (error) {
      console.log(`157-${error.message}`);

      throw new ApolloError('Server error');
    }
  },
  fetchSingleChatConversation: async (req, conversationId, scope) => {
    console.time('fetch single chat conversations');
    const currentUserId = getAuthUser(req);
    if (scope === 'PERSONAL') {
      let getConversations = await PersonalChat.find({
        $or: [
          { sender: currentUserId, receiver: conversationId },
          { sender: conversationId, receiver: currentUserId },
        ],
      })
        .populate({
          path: 'sender',
          select: 'name slug avatar isOnline offlinedAt',
        })
        .populate({
          path: 'receiver',
          select: 'name slug avatar isOnline offlinedAt',
        })
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(+constant.NUMBER_OF_MESSAGES_PER_LOAD);
      if (getConversations.length) {
        getConversations = getConversations.map((conversation) => {
          const _messages = conversation._doc;
          if (
            _messages.messageType === 'IMAGE' ||
            _messages.messageType === 'ATTACHMENT'
          ) {
            return {
              ..._messages,
              file: {
                ..._messages.file,
                data: `data:${
                  _messages.file.mimetype
                };base64,${_messages.file.data.toString('base64')}`,
              },
            };
          }
          return { ..._messages };
        });
        const profile =
          getConversations[0].sender._id.toString() ===
          conversationId.toString()
            ? getConversations[0].sender
            : getConversations[0].receiver;
        const latestMessage = getConversations[0];
        const hasSeenLatestMessage =
          latestMessage.receiver._id.toString() === currentUserId.toString() &&
          latestMessage.receiverStatus !== 'SEEN'
            ? false
            : true;
        console.timeEnd('fetch single chat conversations');
        return {
          profile,
          messages: [...getConversations.reverse()],
          scope,
          latestMessage,
          hasSeenLatestMessage,
        };
      }
    }
    return null;
  },
  // scope received either PERSONAL or GROUP
  sendMessageChatText: async (
    req,
    receiverId,
    text,
    scope,
    pubsub,
    sentMessageChatSubscription
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      if (scope === 'PERSONAL') {
        const currentUser = await User.findById(currentUserId, {
          name: 1,
          slug: 1,
          avatar: 1,
          conversations: 1,
          isOnline: 1,
          offlinedAt: 1,
        });

        if (!currentUser) {
          return {
            error: {
              message: 'UnAuthorized',
              statusCode: 400,
            },
          };
        }
        const receiver = await User.findOne(
          {
            _id: receiverId,
            blocks: { $ne: currentUserId },
          },
          {
            name: 1,
            slug: 1,
            avatar: 1,
            conversations: 1,
            isOnline: 1,
            offlinedAt: 1,
          }
        );
        if (!receiver) {
          return {
            error: {
              message: "You can't send message to this person",
              statusCode: 400,
            },
          };
        }
        if (text) {
          const newPersonalChatText = new PersonalChat({
            sender: currentUserId,
            receiver: receiverId,
            messageType: 'TEXT',
            text,
          });
          const session = await mongoose.startSession();
          session.startTransaction();

          if (!currentUser.conversations) {
            currentUser.conversations = [
              { conversationId: receiverId.toString() },
            ];
          } else {
            //check conversation has contained receiverd Id
            const checkIndexExisted = currentUser.conversations.findIndex(
              (conversation) =>
                conversation.conversationId.toString() === receiverId.toString()
            );
            if (checkIndexExisted === -1) {
              currentUser.conversations.push({
                conversationId: receiverId.toString(),
              });
            } else {
              currentUser.conversations.set(checkIndexExisted, {
                conversationId: receiverId.toString(),
                latestMessage: Date.now(),
              });
            }
          }

          if (!receiver.conversations) {
            receiver.conversations = [
              { conversationId: currentUserId.toString() },
            ];
          } else {
            //check conversation has contained receiverd Id
            const checkIndexExisted = receiver.conversations.findIndex(
              (conversation) =>
                conversation.conversationId.toString() ===
                currentUserId.toString()
            );
            if (checkIndexExisted === -1) {
              receiver.conversations.push({
                conversationId: currentUserId.toString(),
              });
            } else {
              receiver.conversations.set(checkIndexExisted, {
                conversationId: currentUserId.toString(),
                latestMessage: Date.now(),
              });
            }
          }

          await currentUser.save();
          await receiver.save();

          await newPersonalChatText.save();
          await session.commitTransaction();
          session.endSession();
          const _cloneChatText = newPersonalChatText._doc;
          pubsub.publish(sentMessageChatSubscription, {
            sentMessageChatSubscription: {
              action: 'SENT',
              scope,
              message: { ..._cloneChatText, sender: currentUser, receiver },
            },
          });
          return {
            message: { ..._cloneChatText, sender: currentUser, receiver },
            scope,
          };
        }
      }
      return {
        error: {
          message: 'Send message fail, there were some errors occured',
          statusCode: 400,
        },
      };
    } catch (error) {
      console.log(`286-${error.message}`);
      throw new ApolloError('Server error');
    }
  },
  sendMessageChatFile: async (
    req,
    receiverId,
    file,
    scope,
    messageType,
    pubsub,
    sentMessageChatSubscription
  ) => {
    try {
      const { encoding, filename, mimetype } = file;
      const currentUserId = getAuthUser(req);
      const currentUser = await User.findById(currentUserId, {
        name: 1,
        slug: 1,
        avatar: 1,
        conversations: 1,
        isOnline: 1,
        offlinedAt: 1,
      });
      const receiver = await User.findOne(
        {
          _id: receiverId,
          blocks: { $ne: currentUserId },
        },
        {
          name: 1,
          slug: 1,
          avatar: 1,
          conversations: 1,
          isOnline: 1,
          offlinedAt: 1,
        }
      );
      if (!receiver) {
        return {
          error: {
            message: 'User not found',
            statusCode: 400,
          },
        };
      }
      const { data } = decodeBase64(encoding);
      if (scope === 'PERSONAL') {
        const session = await mongoose.startSession();
        session.startTransaction();
        const newPersonalMessageFile = new PersonalChat({
          sender: currentUserId,
          receiver: receiverId,
          messageType,
          file: {
            data,
            filename,
            mimetype,
          },
        });

        if (!currentUser.conversations) {
          currentUser.conversations = [
            { conversationId: receiverId.toString() },
          ];
        } else {
          //check conversation has contained receiverd Id
          const checkIndexExisted = currentUser.conversations.findIndex(
            (conversation) =>
              conversation.conversationId.toString() === receiverId.toString()
          );
          if (checkIndexExisted === -1) {
            currentUser.conversations.push({
              conversationId: receiverId.toString(),
            });
          } else {
            currentUser.conversations.set(checkIndexExisted, {
              conversationId: receiverId.toString(),
              latestMessage: Date.now(),
            });
          }
        }

        if (!receiver.conversations) {
          receiver.conversations = [
            { conversationId: currentUserId.toString() },
          ];
        } else {
          //check conversation has contained receiverd Id
          const checkIndexExisted = receiver.conversations.findIndex(
            (conversation) =>
              conversation.conversationId.toString() ===
              currentUserId.toString()
          );
          if (checkIndexExisted === -1) {
            receiver.conversations.push({
              conversationId: currentUserId.toString(),
            });
          } else {
            receiver.conversations.set(checkIndexExisted, {
              conversationId: currentUserId.toString(),
              latestMessage: Date.now(),
            });
          }
        }
        await currentUser.save();
        await receiver.save();
        await newPersonalMessageFile.save();
        await session.commitTransaction();
        session.endSession();
        const _cloneNewPersonalMessageFile = newPersonalMessageFile._doc;
        const messageResult = {
          ..._cloneNewPersonalMessageFile,
          sender: currentUser,
          receiver,
          file: {
            ..._cloneNewPersonalMessageFile.file,
            data: encoding,
          },
        };
        pubsub.publish(sentMessageChatSubscription, {
          sentMessageChatSubscription: {
            action: 'SENT',
            message: messageResult,
            scope,
          },
        });
        return {
          message: messageResult,
          scope,
        };
      }
      return {
        error: {
          message: 'Send message fail, there were some errors occured',
          statusCode: 400,
        },
      };
    } catch (error) {
      console.log(`418-${error.message}`);
      return {
        error: {
          message: 'Send message fail, there were some errors occured',
          statusCode: 400,
        },
      };
    }
  },
  updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched: async (
    req,
    listSenderId,
    pubsub,
    notifySendersThatReceiverOnlineHasReceivedMessagesChat
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      for (let senderId of listSenderId) {
        await PersonalChat.updateMany(
          { sender: senderId, receiver: currentUserId, receiverStatus: 'SENT' },
          { receiverStatus: 'DELIVERED' },
          { new: true }
        );
      }
      pubsub.publish(notifySendersThatReceiverOnlineHasReceivedMessagesChat, {
        notifySendersThatReceiverOnlineHasReceivedMessagesChat: {
          senders: listSenderId,
          receiver: currentUserId,
        },
      });
      return true;
    } catch (error) {
      console.log(`448-${error.message}`);
      throw new ApolloError(error.message);
    }
  },
  updatePersonalReceiverWhenReceivedNewMessage: async (
    req,
    messageId,
    messageStatus,
    pubsub,
    notifySenderThatReceiverHasReceivedMessageChat
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      const updatedMessage = await PersonalChat.findOneAndUpdate(
        { _id: messageId, receiver: currentUserId },
        { receiverStatus: messageStatus },
        { new: true }
      )
        .populate({
          path: 'sender',
          select: 'name slug avatar isOnline offlinedAt',
        })
        .populate({
          path: 'receiver',
          select: 'name slug avatar isOnline offlinedAt',
        });

      let _cloneUpdatedMessage = updatedMessage._doc;
      if (updatedMessage.messageType !== 'TEXT') {
        _cloneUpdatedMessage.file.data = `data:${
          _cloneUpdatedMessage.file.mimetype
        };base64,${_cloneUpdatedMessage.file.data.toString('base64')}`;
      }

      pubsub.publish(notifySenderThatReceiverHasReceivedMessageChat, {
        notifySenderThatReceiverHasReceivedMessageChat: {
          action: messageStatus,
          scope: 'PERSONAL',
          message: _cloneUpdatedMessage,
        },
      });
      return true;
    } catch (error) {
      console.log(`485-${error.message}`);
      throw new ApolloError(error.message);
    }
  },
  updateHaveSeenAllMessages: async (
    req,
    conversationId,
    scope,
    pubsub,
    senderSubscribeWhenReceiverHasSeenAllMessages
  ) => {
    try {
      const currentUserId = getAuthUser(req);
      if (scope === 'PERSONAL') {
        const updatedResult = await PersonalChat.updateMany(
          {
            receiver: currentUserId,
            sender: conversationId,
            receiverStatus: { $ne: 'SEEN' },
          },
          { receiverStatus: 'SEEN' },
          { new: true }
        );
        if (updatedResult.nModified) {
          pubsub.publish(senderSubscribeWhenReceiverHasSeenAllMessages, {
            senderSubscribeWhenReceiverHasSeenAllMessages: {
              scope,
              action: 'SEEN',
              senderId: conversationId,
              receiverId: currentUserId,
            },
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.log(`522-${error.message}`);
      throw new ApolloError(error.message);
    }
  },
};
