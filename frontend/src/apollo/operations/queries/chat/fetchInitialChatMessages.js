import {gql} from "@apollo/client"

export const FETCH_INITIAL_CHAT_MESSAGES = gql`
  query ($limit: Int, $skip: Int){
    fetchInitialChatMessages(skip: $skip, limit : $limit){
      privateMessages{
        _id
        sender{
          _id
          name
          slug
          avatar
        }
        receiver{
          _id
          name
          slug
          avatar
        }
        messageType        
        receiverStatus
        senderStatus
        text        
        createdAt
        updatedAt   
      }
    
    }
  }
`