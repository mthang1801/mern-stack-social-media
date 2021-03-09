import {gql} from "@apollo/client";

export const UPDATE_PRIVATE_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVED_NEW_MESSAGE = gql`
  mutation ($messageId: ID!){
    updatePrivateReceiverStatusSentToDeliveredWhenReceivedNewMessage(messageId: $messageId)
  }
`