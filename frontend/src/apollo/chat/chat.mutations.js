import { gql } from "@apollo/client";

export const SEND_MESSAGE_CHAT_FILE = gql`
  mutation(
    $receiverId: ID!
    $encoding: String!
    $filename: String!
    $mimetype: String!
    $scope: String!
    $messageType: String!
  ) {
    sendMessageChatFile(
      receiverId: $receiverId,
      file: { encoding: $encoding, filename: $filename, mimetype: $mimetype },
      scope: $scope,
      messageType: $messageType
    ) {
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
        file{
          data
          filename
          mimetype
        }
        receiverStatus
        senderStatus
        text
        createdAt
        updatedAt
      }
      scope
      error {
        message
        statusCode
      }
    }
  }
`;


export const SEND_MESSAGE_CHAT_TEXT = gql`
  mutation ($receiverId: ID!, $text : String!, $scope: String!){
    sendMessageChatText(receiverId : $receiverId, text : $text, scope: $scope){      
      message {        
        _id
        sender{
          _id
          name
          slug
          avatar
          isOnline
          offlinedAt
        }
        receiver{
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
        createdAt
        updatedAt   
      }  
      scope 
      error {
        message
        statusCode
      }
    }
  }
`

export const UPDATE_HAVE_SEEN_ALL_MESSAGES=gql`
  mutation ($conversationId : ID!, $scope: String!){
    updateHaveSeenAllMessages(conversationId: $conversationId, scope: $scope)
  }
`

export const UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED= gql`
  mutation ($listSenderId : [ID!]!){
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched(listSenderId: $listSenderId)
  }
`

export const UPDATE_PERSONAL_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE = gql`
  mutation ($messageId: ID!, $messageStatus: String!){
    updatePersonalReceiverWhenReceivedNewMessage(messageId: $messageId, messageStatus : $messageStatus)
  }
`