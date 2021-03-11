import {gql} from "@apollo/client";

export const UPDATE_PRIVATE_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE = gql`
  mutation ($messageId: ID!, $messageStatus: String!){
    updatePrivateReceiverWhenReceivedNewMessage(messageId: $messageId, messageStatus : $messageStatus)
  }
`