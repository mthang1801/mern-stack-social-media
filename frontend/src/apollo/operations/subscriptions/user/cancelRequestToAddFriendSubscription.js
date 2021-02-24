import { gql } from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
      sender {
        _id
        slug
        friends
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
      }
      receiver {
        _id
        slug
        friends
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
      }
    }
  }
`;
