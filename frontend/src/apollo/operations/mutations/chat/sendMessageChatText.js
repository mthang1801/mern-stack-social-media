import {gql} from "@apollo/client";

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