import { gql } from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      fieldIdentity {
        sender {
          _id
          name
          slug
          following
          friends
          sentRequestToAddFriend
        }
        receiver {
          _id
          name
          slug
          followed
          friends
          receivedRequestToAddFriend
          notifications
        }
      }
      creator {
        _id
        name
        slug
        avatar
      }
      updatedAt
      createdAt
    }
  }
`;
