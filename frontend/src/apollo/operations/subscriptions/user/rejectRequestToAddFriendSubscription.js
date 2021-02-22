import { gql } from "@apollo/client";

export const REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    rejectRequestToAddFriendSubscription(userId: $userId) {
      sender {
        _id
        slug       
        following
        followed
        sendRequestToAddFriend
        receiveRequestToAddFriend
      }
      receiver {
        _id
        slug       
        following
        followed
        sendRequestToAddFriend
        receiveRequestToAddFriend
      }
    }
  }
`;
