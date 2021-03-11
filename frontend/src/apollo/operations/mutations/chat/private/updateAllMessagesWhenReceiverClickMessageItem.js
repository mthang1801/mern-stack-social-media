import {gql} from "@apollo/client";

export const UPDATE_ALL_MESSAGES_WHEN_RECEIVER_CLICK_MESSAGE_ITEM=gql`
  mutation ($senderId : ID!, $status: String!){
    updateAllMessagesWhenReceiverClickMessageItem(senderId: $senderId, status: $status)
  }
`