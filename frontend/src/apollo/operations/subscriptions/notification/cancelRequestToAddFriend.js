import { gql } from "@apollo/client";

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      url
      fieldIdentity {
        sender {
          _id          
          following
          friends
          sentRequestToAddFriend
        }
        receiver {
          _id          
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
