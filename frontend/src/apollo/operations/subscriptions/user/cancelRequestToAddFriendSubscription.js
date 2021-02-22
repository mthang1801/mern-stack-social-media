import { gql } from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
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
