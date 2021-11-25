import { gql } from 'apollo-server-express';

export const schemaEnum = gql`
  enum PostStatusEnum {
    PUBLIC
    PRIVATE
    FRIENDS
  }
  enum ActionEnum {
    CREATED
    UPDATED
    DELETED
    ADDED
    ACCEPTED
    REMOVED
  }
  enum ContactEnum {
    ADDED
    ACCEPTED
    REMOVED
  }
  enum PersonalChatReceiverStatusEnum {
    SENT
    DELIVERED
    SEEN
    DELETED
  }
  enum PersonalChatSenderStatusEnum {
    SENT
    RECALLED
    DELETED
  }
  enum MessageTypeEnum {
    TEXT
    IMAGE
    ATTACHMENT
  }
  enum ChatScopeEnum {
    PERSONAL
    GROUP
  }

  enum ReceiverStatusChatEnum {
    UNRECEIVED
    RECEIVED
    SEEN
    DELETED
  }

  enum SenderStatusChatEnum {
    SENT
    RECALLED
    DELETED
  }
`;
