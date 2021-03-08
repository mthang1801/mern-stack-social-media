import {gql} from "@apollo/client";

export const SEND_PRIVATE_MESSAGE_CHAT_TEXT = gql`
  mutation ($receiverId: ID!, $text : String!){
    sendPrivateMessageChatText(receiverId : $receiverId, text : $text){      
      message {        
        _id
        sender
        receiver
        messageType        
        receiverStatus
        senderStatus
        text        
        createdAt
        updatedAt   
      }   
      error {
        message
        statusCode
      }
    }
  }
`