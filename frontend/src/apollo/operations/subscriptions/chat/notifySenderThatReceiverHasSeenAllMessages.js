import {gql} from "@apollo/client";

export const NOTIFY_SENDER_THAT_RECEIVER_HAS_SEEN_ALL_MESSAGES = gql`
  subscription ($userId: ID!){
    notifySenderThatReceiverHasSeenAllMessages(userId: $userId){
      action
      status
      message {
        _id
        sender {
          _id
          name
          slug
          avatar
        }
        receiver {
          _id
          name
          slug
          avatar
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