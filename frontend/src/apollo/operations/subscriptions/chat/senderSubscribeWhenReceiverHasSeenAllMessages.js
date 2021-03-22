import {gql} from "@apollo/client";

export const SENDER_SUBSCRIBE_WHEN_RECEIVER_HAS_SEEN_ALL_MESSAGES = gql`
  subscription ($userId: ID!){
    senderSubscribeWhenReceiverHasSeenAllMessages(userId: $userId){
      action
      scope    
      receiverId 
    }
  }
`