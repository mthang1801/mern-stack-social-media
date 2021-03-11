import {gql} from "@apollo/client";

export const UPDATE_PERSONAL_RECEIVER_WHEN_RECEIVED_NEW_MESSAGE = gql`
  mutation ($messageId: ID!, $messageStatus: String!){
    updatePersonalReceiverWhenReceivedNewMessage(messageId: $messageId, messageStatus : $messageStatus)
  }
`