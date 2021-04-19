import { gql } from "@apollo/client";

export const NOTIFY_SENDERS_RECEIVER_ONLINE_HAS_RECEIVED_MESSAGES = gql`
  subscription($userId: ID!) {
    notifySendersThatReceiverOnlineHasReceivedMessagesChat(userId: $userId) {      
      receiver
    }
  }
`;



export const NOTIFY_SENDER_THAT_RECEIVER_HAS_RECEIVED_NEW_MESSAGE_CHAT = gql`
  subscription ($userId : ID!){
    notifySenderThatReceiverHasReceivedMessageChat(userId: $userId){
      action
      scope
      message {
        _id
        sender {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        receiver {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        messageType
        receiverStatus
        senderStatus
        text
        file {
          data
          filename
          mimetype
        }
        blocked {
          _id
          slug
        }
        createdAt
        updatedAt
      }
    }
  }
`


export const SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES = gql`
  subscription ($userId: ID!){
    senderSubscribeWhenReceiverHasSeenAllMessages(userId: $userId){
      action
      scope    
      receiverId 
    }
  }
`

export const SENT_MESSAGE_CHAT_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    sentMessageChatSubscription(userId: $userId) {
      action
      scope
      message {
        _id
        sender {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        receiver {
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        messageType
        receiverStatus
        senderStatus
        text
        file {
          data
          filename
          mimetype
        }
        blocked {
          _id
          slug
        }
        createdAt
        updatedAt
      }
    }
  }
`;
