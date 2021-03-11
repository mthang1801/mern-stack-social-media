import {gql} from "@apollo/client";

export const UPDATE_HAVE_SEEN_ALL_MESSAGES=gql`
  mutation ($conversationId : ID!, $scope: String!){
    updateHaveSeenAllMessages(conversationId: $conversationId, scope: $scope)
  }
`