import { gql } from "@apollo/client";

export const SEND_REQUEST_TO_ADD_FRIEND = gql`
  mutation ($userId : ID!){
    sendRequestToAddFriend(userId: $userId)
  }
`;
