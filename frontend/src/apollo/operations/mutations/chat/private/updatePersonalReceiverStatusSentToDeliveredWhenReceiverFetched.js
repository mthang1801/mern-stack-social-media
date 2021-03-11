import {gql} from "@apollo/client"

export const UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED= gql`
  mutation ($listSenderId : [ID!]!){
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched(listSenderId: $listSenderId)
  }
`