import {gql} from "@apollo/client"

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