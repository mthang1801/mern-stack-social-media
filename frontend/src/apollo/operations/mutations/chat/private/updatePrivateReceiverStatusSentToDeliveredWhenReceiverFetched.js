import {gql} from "@apollo/client"

export const UPDATE_PRIVATE_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED= gql`
  mutation ($listSenderId : [ID!]!){
    updatePrivateReceiverStatusSentToDeliveredWhenReceiverFetched(listSenderId: $listSenderId)
  }
`