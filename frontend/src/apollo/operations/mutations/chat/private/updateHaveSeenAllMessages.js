import {gql} from "@apollo/client";

export const UPDATE_HAVE_SEEN_ALL_MESSAGES=gql`
  mutation ($conversationId : ID!, $status: String!){
    updateHaveSeenAllMessages(conversationId: $conversationId, status: $status)
  }
`